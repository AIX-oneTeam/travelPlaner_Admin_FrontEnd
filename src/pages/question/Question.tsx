import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Question.module.css";
import axios from "axios";
import { API_BASE_URL } from "../../config";

interface Inquiry {
  inquiry_id: number;
  member_id: number;
  title: string;
  content: string;
  created_at: string;
  status: string;
}

function Question() {
  const { inquiry_id } = useParams<{ inquiry_id: string }>();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string>(''); // 답변 내용을 저장할 상태 추가

  useEffect(() => {
    const fetchInquiry = async () => {
      setLoading(true);
      setError(null);

      const numericId = parseInt(inquiry_id || '', 10);

      if (isNaN(numericId)) {
        setError("유효하지 않은 문의 ID입니다.");
        setLoading(false);
        return;
      }

      try {
        console.log("요청 URL:", `${API_BASE_URL}/inquiries/${numericId}`);
        const response = await axios.get(`${API_BASE_URL}/inquiries/${numericId}`);
        console.log("백엔드에서 받은 응답:", response.data);

        if (response.data.status === "성공" && response.data.data?.inquiry) {
          setInquiry(response.data.data.inquiry);
        } else {
          setError(response.data.message || "문의 정보를 찾을 수 없습니다.");
        }
      } catch (err: any) {
        console.error("Error details:", err);
        if (axios.isAxiosError(err) && err.response) {
          const errorMessage = err.response.data.message || "문의 정보를 불러오는 데 실패했습니다.";
          console.error("Server error response:", err.response.data);
          setError(errorMessage);
        } else {
          setError("문의 정보를 불러오는 중 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (inquiry_id) {
      fetchInquiry();
    }
  }, [inquiry_id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
  };

  const getStatusText = (status: string) => {
    return status === 'pending' ? '미답변' : status;
  };

  const handleGoBack = () => {
    navigate(-1);
  };


  const handleCompleteAnswer = async () => {
    if (!answer.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }

    try {
      const numericId = parseInt(inquiry_id || '', 10);
      const response = await axios.put(`${API_BASE_URL}/inquiries/admin/answer/${numericId}`, {
        answer: answer
      });

      if (response.data.status === "성공") {
        alert("답변이 완료되었습니다.");
        navigate("/question");
      } else {
        alert(response.data.message || "답변 완료 처리 중 오류가 발생했습니다.");
      }
    } catch (err: any) {
      console.error("Error details:", err);
      if (axios.isAxiosError(err) && err.response) {
        alert(err.response.data.message || "답변 완료 처리 중 오류가 발생했습니다.");
      } else {
        alert("답변 완료 처리 중 오류가 발생했습니다.");
      }
    }
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
          <h1 className={styles.question_title}>제목: {inquiry.title}</h1>
          <p className={styles.question_info}>
            작성자 ID: {inquiry.member_id} | 작성일: {formatDate(inquiry.created_at)} | 상태: {getStatusText(inquiry.status)}
          </p>
        </div>
        <div className={styles.question_main_content_container}>
          <h2 className={styles.question_container_title}>문의 내용</h2>
          <div className={styles.question_content}>{inquiry.content}</div>
        </div>
        {/* 답변 작성 영역 추가 */}
        <div className={styles.question_answer_container}>
          <h2 className={styles.question_container_title}>답변 작성</h2>
          <textarea
            className={styles.question_answer_textarea}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="답변을 입력해주세요."
            rows={5}
          />
        </div>
        <div className={styles.question_final_button_container}>
          <button type="button" className={styles.question_final_button} onClick={handleGoBack}>
            돌아가기
          </button>
          <button
            type="button"
            className={styles.question_final_button}
            onClick={handleCompleteAnswer}
            disabled={!answer.trim()} // 답변이 비어있으면 버튼 비활성화
          >
            답변완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default Question;