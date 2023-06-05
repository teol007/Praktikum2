import { Card } from 'primereact/card';
import { useAtom } from "jotai";
import { answersDBAtom } from "../../../Atoms/AnswersDBAtom";
import { usersDBAtom } from "../../../Atoms/UsersDBAtom";
import { AnswerWithId } from "../../../Modules/Interfaces/Answer";
import ResponseToAnswer from "./Response/ResponseToAnswer";
import AnswerDetails from "../../Answer/AnswerDetails/AnswerDetails";
import { userAuthentication } from "../../../Atoms/UserAuthentication";
import { QuestionWithId } from "../../../Modules/Interfaces/Question";
import { questionsDBAtom } from "../../../Atoms/QuestionsDBAtom";
import ResponsesStatusesCount from '../../Answer/Response/ResponsesStatusesCount/ResponseStatuses';
import TimeUntilAnswered from '../../Answer/TimeUntilAnswered/TimeUntilAnswered';
import ProgressBar from '../../ProgressBar/ProgressBar';

export default function DisplayAnswersToEvaluate(): JSX.Element {
  const [questions] = useAtom(questionsDBAtom);
  const [answers] = useAtom(answersDBAtom);
  const [users] = useAtom(usersDBAtom);
  const [loggedInUser] = useAtom(userAuthentication);

  const answerAuthor = (answer: AnswerWithId): JSX.Element => {
    let text = '';
    text += users.find((user) => user.uid === answer.authorUid)?.academicTitle + ' ';
    text += users.find((user) => user.uid === answer.authorUid)?.fullName;
    return <>{text}</>;
  };

  const countResponsesByAnswer = (answer: AnswerWithId): number => {
    if (answer.responses) {
      return answer.responses.filter(response => response.commenterUid === loggedInUser?.uid).length;
    }
    return 0;
  };


  const findLawField = (answer: AnswerWithId) => {
    const question: QuestionWithId | undefined = questions.find((q) => q.id === answer.questionId);
    const lawField = question?.lawFields;
    const joinedLawFields = lawField?.join(" & ")
    checkDate(answer)
    return joinedLawFields;
  };

  const checkDate = (answer: AnswerWithId) => {
    const storedDate = answer.authorAssigned?.toDate()
    const todayDate = new Date()


    if(storedDate){
      const differenceInTime = todayDate.getTime() - storedDate?.getTime();
      const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

      if (differenceInDays >= 12) {
        return "#ff9991";
      }
    } else {
      console.log('No date');
    }
  }
  
    
  

  const sortedAnswers = [...answers].sort((b, a) => countResponsesByAnswer(b) - countResponsesByAnswer(a));

  const filteredAnswers = sortedAnswers.filter(answer => {
    const goodResponsesCount = answer.responses.filter(response => response.status === 'Good').length;
    const isAuthorLoggedInUser = answer.authorUid === loggedInUser?.uid;
    const isAnswered = answer.answered != null;
    return goodResponsesCount < 3 && !isAuthorLoggedInUser && !isAnswered;
  });

  return (
    <div className="container">
      <ProgressBar activeIndex={1} />
      <h2 style={{ marginTop: '1em' }}>Vprašanja za oceniti</h2>
      <div className="row">
        {filteredAnswers.map(answer => (
          <div key={answer.id} className="col flex justify-content-center" style={{ paddingTop: '1rem', paddingBottom: '1rem' }} >
            <Card title={() => findLawField(answer)} subTitle={<><span>Avtor odgovora: </span><span>{answerAuthor(answer)}</span></>} 
              className="md:w-25rem" style={{backgroundColor: checkDate(answer)}}>
              <TimeUntilAnswered answer={answer} />
              <br />


              <ResponsesStatusesCount responses={answer.responses} />
              <hr />

              <div style={{ marginLeft: '3em', marginRight: '3em' }}>
                <AnswerDetails answer={answer} />
                <ResponseToAnswer answer={answer} />
                <div style={{color:"gray", fontSize:"13px"}}>Na to vprašanje si že odgovoril: {countResponsesByAnswer(answer)}x</div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
