import React, { useState } from "react";
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { UploadMetadata, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, fileStorage } from "../../../../Config/Firebase";
import { CustomMetadata } from "../../../../Modules/Interfaces/StorageFile";
import { AnswerWithId } from "../../../../Modules/Interfaces/Answer";
import { updateDoc, Timestamp, doc } from "firebase/firestore";
import { useAtom } from "jotai";
import { userAuthentication } from "../../../../Atoms/UserAuthentication";
import { Group } from "../../../../Modules/Interfaces/UserCustomInfo";

interface AnswerProps {
  answer: AnswerWithId;
}

const acceptedFiles: string[] = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export default function FileUploadArea(props: AnswerProps): JSX.Element {
  const [user] = useAtom(userAuthentication);
  const [downloadStatus, setDownloadStatus] = useState<string>('');

  const handleUpload = (event: FileUploadHandlerEvent) => {
    if(!user)
    {
      console.error('For file upload you have to be signed in');
      setDownloadStatus('Za nalaganje datotek moraš biti prijavljen')
      return;
    }

    if(user.group!==Group.Manager && user.group!==Group.Author)
    {
      console.error('You do not have permission for file uploads');
      setDownloadStatus('Nimaš dovoljenja za nalaganje');
      return;
    }
  
    const file = event.files[0];

    if(!acceptedFiles.includes(file.type))
    {
      setDownloadStatus('Napaka: Napačen tip datoteke');
      console.warn('Wrong file type');
      return;
    }
   

    const customMetadata: CustomMetadata = {
      realFileName: file.name,
      uploadedByUid: user.uid,
      answerId: props.answer.id
    };
  
    const fileMetadata: UploadMetadata  = {
      contentType: file.type,
      customMetadata: customMetadata
    };
  
    const storageRef = ref(fileStorage, 'AnswerFiles/'+props.answer.id+'.'+file.name.split('.').pop());
    const uploadTask = uploadBytesResumable(storageRef, file, fileMetadata);
  
    uploadTask.on('state_changed', (snapshot) => { // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setDownloadStatus('Naloženih je že ' + Math.round(progress) + '%.');
    }, (error) => {
      switch (error.code) {
        case 'storage/unauthorized': setDownloadStatus('Napaka: nimate dovoljenja'); console.error("User doesn't have permission to access the object"); break;
        case 'storage/canceled': setDownloadStatus('Preklicano'); console.error("User canceled the upload"); break;
        case 'storage/unknown': setDownloadStatus('Napaka'); console.error(error.serverResponse); break;
        default : setDownloadStatus('Neznana napaka'); console.error('There was an error while trying to upload a file');
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
        accept={acceptedFiles.join(',')}
        maxFileSize={1000000000}
        emptyTemplate={<p className="m-0">Povleči in spusti <strong>novo datoteko</strong> sem.</p>}
        chooseLabel='Izberi'
        uploadLabel='Naloži'
        cancelLabel="Prekliči"
        customUpload={true} 
      />
      {downloadStatus!=='' && <p>{downloadStatus}</p>}
    </>
  );
}
