import {Controller, useForm} from "react-hook-form";
import {FaCheckCircle, FaTimesCircle} from "react-icons/fa";
import FormElement from "../components/shared/FormElement.jsx";
import {MdOutlineRateReview} from "react-icons/md";
import {mockSubjectSuggestions} from "../data/seeds.js";
import {useState} from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {useNavigate} from "react-router-dom";

const ACV_API_BASE_URL = import.meta.env.VITE_ACV_API_BASE_URL;

const ReviewForm = () => {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            subject: "",
            rating: "",
            term: "",
            workload: "",
            comment: "",
        },
    });

    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusCode, setStatusCode] = useState(null);
    const navigate = useNavigate();

    // Set up Mock API using MockAdapter to intercept HTTP requests and return mock data
    const mock = new MockAdapter(axios);
    mock.onPost(`${ACV_API_BASE_URL}/Prod/review/`).reply(200, {
        message: "投稿が完了しました！",
    });

    const onSubmit = async (formData) => {
        try {
            const response = await axios.post(`${ACV_API_BASE_URL}/Prod/review/`, formData);
            setStatusCode(response.status);
            if (response.status === 200) {
                setModalMessage(response.data.message);
            } else {
                setModalMessage("予期しないエラーが発生しました");
            }
        } catch (error) {
            setStatusCode(error.response?.status || 500);
            setModalMessage("送信中にエラーが発生しました");
        } finally {
            setIsModalOpen(true);
        }
    };

    return (
        <div className="mx-auto mb-32">
            <div className="flex justify-center bg-gradient-to-r from-primary to-secondary h-[250px] w-full">
                <h1 className="text-4xl sm:text-6xl text-white uppercase pt-14 font-mono">講義レビュー投稿</h1>
                <MdOutlineRateReview className="w-10 h-10 mt-10 text-white" />
            </div>
            <div className="px-4 sm:w-2/3 lg:w-1/2 mx-auto">
                <div className="rounded-lg shadow-lg bg-white -mt-24 py-10 md:py-12 px-4 md:px-6">
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="subject"
                                control={control}
                                rules={{required: true}}
                                render={({field}) => (
                                    <FormElement
                                        type="input"
                                        label="教科名"
                                        placeholder="教科名を入力してください"
                                        fieldRef={field}
                                        hasError={errors.subject?.type === "required"}
                                        options={mockSubjectSuggestions}
                                    />
                                )}
                            />
                            <Controller
                                name="rating"
                                control={control}
                                rules={{required: true}}
                                render={({field}) => (
                                    <FormElement
                                        type="starRating"
                                        label="評価"
                                        fieldRef={field}
                                        hasError={errors.rating?.type === "required"}
                                    />
                                )}
                            />
                            <Controller
                                name="term"
                                control={control}
                                rules={{required: true}}
                                render={({field}) => (
                                    <FormElement
                                        type="select"
                                        label="ターム"
                                        placeholder="選択してください"
                                        fieldRef={field}
                                        options={[{value: "1"}, {value: "2"}, {value: "3"}, {value: "4"}]}
                                        hasError={errors.term?.type === "required"}
                                    />
                                )}
                            />
                            <Controller
                                name="workload"
                                control={control}
                                rules={{required: true}}
                                render={({field}) => (
                                    <FormElement
                                        type="textarea"
                                        label="課題量"
                                        placeholder="課題量を入力してください"
                                        fieldRef={field}
                                        hasError={errors.workload?.type === "required"}
                                    />
                                )}
                            />
                            <Controller
                                name="comment"
                                control={control}
                                rules={{required: true}}
                                render={({field}) => (
                                    <FormElement
                                        type="textarea"
                                        label="コメント"
                                        placeholder="コメントを入力してください"
                                        fieldRef={field}
                                        hasError={errors.comment?.type === "required"}
                                    />
                                )}
                            />
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-secondary text-white font-medium rounded shadow-md hover:bg-primary hover:shadow-lg focus:bg-secondary focus:outline-none active:primary"
                            >
                                投稿
                            </button>
                        </form>
                        {/* Modal */}
                        {isModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded shadow-lg w-80 flex flex-col items-center">
                                    {statusCode === 200 ? (
                                        <FaCheckCircle className="text-green-500 text-4xl mb-4"/>
                                    ) : (
                                        <FaTimesCircle className="text-red-500 text-4xl mb-4"/>
                                    )}
                                    <p className="text-gray-700 mb-4">{modalMessage}</p>
                                    <button
                                        onClick={() =>
                                            statusCode === 200 ? (navigate("/#latest-reviews")) : (setIsModalOpen(false))
                                        }
                                        className={`mt-4 ${
                                            statusCode === 200
                                                ? "bg-green-500 hover:bg-green-700"
                                                : "bg-red-500 hover:bg-red-700"
                                        } text-white font-bold py-2 px-4 rounded`}
                                    >
                                        閉じる
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;
