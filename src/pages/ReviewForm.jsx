import {Controller, useForm} from "react-hook-form";
import FormElement from "../components/shared/FormElement.jsx";
import {MdOutlineRateReview} from "react-icons/md";
import {mockSubjectSuggestions} from "../data/seeds.js";

const ReviewForm = () => {
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            subject: "",
            term: "",
            workload: "",
            comment: "",
        },
    });

    const onSubmit = (formData) => {
        // TODO Set in the body when sending a request to the API.
        formData
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;
