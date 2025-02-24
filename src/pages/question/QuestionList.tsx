import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from "./QuestionList.module.css";
import { API_BASE_URL } from "../../config";

// Question 인터페이스 정의
interface Question {
  inquiry_id: number;
  title: string;
  created_at: string;
  answer: boolean;
}

function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/inquiries/admin/all`);

      console.log("백엔드에서 받은 응답:", response.data);

      if (response.data && response.data.data && Array.isArray(response.data.data.inquiries)) {
        setQuestions(response.data.data.inquiries);
        console.log("상태 업데이트 완료:", response.data.data.inquiries);
      } else {
        console.error("응답 데이터 형식이 올바르지 않습니다:", response.data);
        setQuestions([]); 
      }
    } catch (error) {
      console.error("Axios 요청 실패:", error);
      setQuestions([]);
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
              {Array.isArray(questions) && questions.length > 0 ? (
                questions.map((question) => (
                  <tr key={question.inquiry_id}>
                    <td>{question.inquiry_id}</td>
                    <td>
                      <Link to={`/inquiry/${question.inquiry_id}`}>
                        {question.title}
                      </Link>
                    </td>
                    <td>{question.created_at.split("T")[0]}</td>
                    <td>{question.answer ? "답변완료" : "미답변"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                    문의 내역이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default QuestionList;
