import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from "./QuestionList.module.css";

// Question 인터페이스 정의
interface Question {
  id: number;
  title: string;
  date: string;
  answered: boolean;
}

function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get<Question[]>('/inquiries/admin/all');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  return (
    <div className={styles.question_list_container}>
      <div className={styles.question_list_content_container}>
        <div className={styles.question_list_title_container}>
          <h1 className={styles.question_list_title}>Inquiry</h1>
        </div>
        <div className={styles.question_list_main_content_container}>
          <table className={styles.question_table}>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr key={question.id}>
                  <td>{question.id}</td>
                  <td>
                    <Link to={`/inquiry/${question.id}`}>
                      {question.title}
                    </Link>
                  </td>
                  <td>{question.date}</td>
                  <td>{question.answered ? '답변완료' : '미답변'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        </div>
      </div>
  );
}

export default QuestionList;
