import React, { useState } from "react";
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { UploadMetadata, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, fileStorage, firebaseAuth } from "../../../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CustomMetadata } from "../../../Modules/Interfaces/StorageFile";
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import { updateDoc, Timestamp, doc } from "firebase/firestore";

interface AnswerProps {
  answer: AnswerWithId;
}

export default function FileUploadArea(props: AnswerProps): JSX.Element {
  const [user] = useAuthState(firebaseAuth);
  const [downloadStatus, setDownloadStatus] = useState<string>('');

  const handleUpload = (event: FileUploadHandlerEvent) => {
    if(!user)
    {
      console.error('Za nalaganje datotek moraš biti prijavljen');
      return;
    }
  
    const file = event.files[0];
  
    const customMetadata: CustomMetadata = {
      realFileName: file.name,
      uploadedByUid: user.uid,
      answerId: props.answer.id
    };
  
    const fileMetadata: UploadMetadata  = {
      contentType: file.type,
      customMetadata: customMetadata
    };
  
    const storageRef = ref(fileStorage, 'AnswerFiles/'+props.answer.id);
    const uploadTask = uploadBytesResumable(storageRef, file, fileMetadata);
  
    uploadTask.on('state_changed', (snapshot) => { // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setDownloadStatus('Naloženih je že ' + Math.round(progress) + '%.');
    }, (error) => {
      switch (error.code) {
        case 'storage/unauthorized': console.error("User doesn't have permission to access the object"); break;
        case 'storage/canceled': console.error("User canceled the upload"); break;
        case 'storage/unknown': console.error(error.serverResponse); break;
        default : console.error('There was an error while trying to upload a file');
      }
    }, () => { // Upload completed successfully, now we can get the download URL
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const answerRef = doc(db, "Answers", props.answer.id);
        updateDoc(answerRef, {
          fileUrl: downloadURL,
          answered: Timestamp.now(),
        }).then(()=>{
          setDownloadStatus('Uspešno naloženo');
          event.options.clear();
        }).catch((error)=>{
          console.error(error);
        });
      });
    });
  }


  return (
    <>
      <FileUpload
        uploadHandler={handleUpload}
        accept={undefined}
        maxFileSize={1000000000}
        emptyTemplate={<p className="m-0">Povlecite in spustite datoteke sem.</p>}
        chooseLabel='Izberi'
        uploadLabel='Naloži'
        cancelLabel="Prekliči"
        customUpload={true} 
      />
      {downloadStatus!=='' && <p>{downloadStatus}</p>}
    </>
  );
}
