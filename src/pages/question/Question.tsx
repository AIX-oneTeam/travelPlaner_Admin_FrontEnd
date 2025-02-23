import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Question.module.css"
import axios from "axios";

interface Inquiry {
  id: number;
  email: string;
  title: string;
  content: string;
  registrationDate: string;
  status: string;
}

function Question() {
  const { inquiry_id } = useParams<{ inquiry_id: string }>();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInquiry = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/inquiries/${inquiry_id}`);
        setInquiry(response.data);
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || "문의 정보를 불러오는 데 실패했습니다.");
        } else {
          setError("문의 정보를 불러오는 중 오류가 발생했습니다.");
        }
        console.error("Error fetching inquiry:", err);
      } finally {
        setLoading(false);
      }
    };

    if (inquiry_id) {
      fetchInquiry();
    }
  }, [inquiry_id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCompleteAnswer = async () => {
    // 답변 완료 로직 구현
    // 예: API 호출을 통해 상태 업데이트
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!inquiry) {
    return <div className={styles.not_found}>문의 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.question_container}>
      <div className={styles.question_content_container}>
        <div className={styles.question_header}>
          <h1 className={styles.question_title}>{inquiry.title}</h1>
          <p className={styles.question_info}>
            작성자: {inquiry.email} | 작성일: {formatDate(inquiry.registrationDate)} | 상태: {inquiry.status}
          </p>
        </div>
        <div className={styles.question_main_content_container}>
          <h2 className={styles.question_container_title}>문의 내용</h2>
          <div className={styles.question_content}>{inquiry.content}</div>
        </div>
        <div className={styles.question_final_button_container}>
          <button type="button" className={styles.question_final_button} onClick={handleGoBack}>
            돌아가기
          </button>
          <button type="button" className={styles.question_final_button} onClick={handleCompleteAnswer}>
            답변완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default Question;
