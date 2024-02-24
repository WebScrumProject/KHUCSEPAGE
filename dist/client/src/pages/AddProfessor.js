"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const professor_1 = require("../store/professor");
const profHistory_1 = require("../store/profHistory");
const react_redux_1 = require("react-redux");
const react_1 = require("react");
const AddProfessor_module_css_1 = __importDefault(require("../styles/AddProfessor.module.css"));
const axios_1 = __importDefault(require("axios"));
// import { ObjectId } from 'mongodb';
const InputProfessor_1 = __importDefault(require("../components/InputProfessor"));
function AddProfessor() {
    let professor = (0, react_redux_1.useSelector)((state) => state.professor);
    let profHistory = (0, react_redux_1.useSelector)((state) => state.profHistory);
    let navigate = (0, react_router_dom_1.useNavigate)();
    let dispatch = (0, react_redux_1.useDispatch)();
    const [professorData, setProfessorData] = (0, react_1.useState)({
        _id: '',
        profName: '',
        profMajor: '',
        profPhone: '',
        profEmail: '',
        profLab: '',
        profLink: '',
        recNumber: '',
        recDate: ''
    });
    const handleInputProfessorChange = (e, field) => {
        setProfessorData({ ...professorData, [field]: e.target.value });
    };
    const inputFields = [
        { placeholder: '이름을 입력해주세요.', name: 'profName' },
        { placeholder: '연구분야를 입력해주세요.', name: 'profMajor' },
        { placeholder: '연락처를 입력해주세요.', name: 'profPhone' },
        { placeholder: '이메일을 입력해주세요.', name: 'profEmail' },
        { placeholder: '연구실의 위치를 입력해주세요.', name: 'profLab' },
        { placeholder: '홈페이지의 링크를 입력해주세요.', name: 'profLink' },
        { placeholder: '모집인원을 입력해주세요.', name: 'recNumber' },
        { placeholder: '기간을 입력해주세요.', name: 'recDate' },
    ];
    const [history, setHistory] = (0, react_1.useState)({
        _id: '',
        date: '2000-00-00',
        content: ''
    });
    const handleInputHistoryChange = (e, field) => {
        setHistory({ ...history, [field]: e.target.value });
    };
    // 이미지 파일 추가
    const [imgFile, setImgFile] = (0, react_1.useState)(null);
    const [previewImg, setPreviewImg] = (0, react_1.useState)(null);
    // 이미지 선택
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImgFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    // 서버에 이미지 파일 전송
    const handleImageUpload = async () => {
        if (imgFile) {
            try {
                const formData = new FormData();
                formData.append('image', imgFile);
                const res = await axios_1.default.post('/undergraduate_student/image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('이미지가 성공적으로 업로드되었습니다.', res);
            }
            catch (error) {
                console.error('이미지 업로드에 실패했습니다.', error);
            }
        }
        else {
            console.error('이미지 파일을 선택해주세요.');
        }
    };
    // axios 코드 (나중에 axios 파일 만들어서 옮길 예정)
    const sendProfessorData = (professorData) => {
        const serverURL = 'http://localhost:8080/undergraduate_student/write';
        axios_1.default.post(serverURL, professorData)
            .then((res) => {
            console.log(res.data);
            dispatch((0, professor_1.addProfessor)({
                _id: res.data,
                profName: professorData.profName,
                profMajor: professorData.profMajor,
                profPhone: professorData.profPhone,
                profEmail: professorData.profEmail,
                profLab: professorData.profLab,
                profLink: professorData.profLink,
                recNumber: professorData.recNumber,
                recDate: professorData.recDate,
            }));
            dispatch((0, profHistory_1.addProfHistory)({
                _id: res.data,
                date: history.date,
                content: history.content,
            }));
        })
            .catch((err) => {
            console.log(err);
        });
    };
    // const fetchId = async () => {
    //   try {
    //       const res = await axios.get(`/undergraduate_student?page=${1}/info`);
    //       const lastProfessor = res.data[res.data.length - 1];
    //       // const lastId = lastProfessor.id;
    //       // setNextId(lastId)
    //       console.log(res.data)
    //   } catch (error) {
    //       console.error(error);
    //     }
    // }
    // useEffect(() => {
    //   fetchId()
    // 2}, )
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', width: '100%' }, children: [(0, jsx_runtime_1.jsxs)("div", { className: AddProfessor_module_css_1.default.add_professor_container, children: [(0, jsx_runtime_1.jsxs)("div", { className: AddProfessor_module_css_1.default.add_professor_profile, children: [(0, jsx_runtime_1.jsxs)("div", { className: AddProfessor_module_css_1.default.add_professor_profile_top, children: [(0, jsx_runtime_1.jsx)("div", { className: AddProfessor_module_css_1.default.add_professor_picture, children: previewImg && ((0, jsx_runtime_1.jsx)("img", { className: AddProfessor_module_css_1.default.image_preview, src: previewImg })) }), (0, jsx_runtime_1.jsx)("input", { type: 'file', accept: 'image/*', id: 'inputTag', className: AddProfessor_module_css_1.default.image_input, onChange: handleImageChange }), (0, jsx_runtime_1.jsx)("label", { htmlFor: 'inputTag', children: "\uC774\uBBF8\uC9C0 \uC120\uD0DD" })] }), (0, jsx_runtime_1.jsxs)("div", { className: AddProfessor_module_css_1.default.add_professor_profile_bottom, children: [inputFields.map((field, index) => ((0, jsx_runtime_1.jsx)(InputProfessor_1.default, { placeholder: field.placeholder, name: field.name, onChange: (e) => handleInputProfessorChange(e, field.name), styles: AddProfessor_module_css_1.default }, index))), (0, jsx_runtime_1.jsx)("button", { onClick: (e) => {
                                            //임시로 넣은 dispatch, 성공 시 뺄 예정
                                            dispatch((0, professor_1.addProfessor)({
                                                _id: '',
                                                profName: professorData.profName,
                                                profMajor: professorData.profMajor,
                                                profPhone: professorData.profPhone,
                                                profEmail: professorData.profEmail,
                                                profLab: professorData.profLab,
                                                profLink: professorData.profLink,
                                                recNumber: professorData.recNumber,
                                                recDate: professorData.recDate,
                                            }));
                                            console.log(professor);
                                            sendProfessorData(professorData);
                                            navigate('/research');
                                        }, children: "\uC644\uB8CC" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: AddProfessor_module_css_1.default.add_professor_history, children: [(0, jsx_runtime_1.jsx)("div", { className: AddProfessor_module_css_1.default.history_content, children: profHistory.map((value, index) => {
                                    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { style: { textAlign: 'start' }, children: `${value.date} CONTENT: ${value.content}` }, index), (0, jsx_runtime_1.jsx)("div", { className: AddProfessor_module_css_1.default.line })] }, index));
                                }) }), (0, jsx_runtime_1.jsxs)("div", { className: AddProfessor_module_css_1.default.history_bottom, children: [(0, jsx_runtime_1.jsx)("input", { type: 'date', onChange: (e) => handleInputHistoryChange(e, 'date') }), (0, jsx_runtime_1.jsx)("input", { className: AddProfessor_module_css_1.default.history_input, placeholder: '\uC785\uB825', onChange: (e) => handleInputHistoryChange(e, 'content') }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", { onClick: (e) => {
                                                //임시로 넣은 dispatch, 성공 시 뺄 예정
                                                dispatch((0, profHistory_1.addProfHistory)({
                                                    _id: '',
                                                    date: history.date,
                                                    content: history.content,
                                                }));
                                                console.log(profHistory);
                                            }, children: "\uCD94\uAC00" }) })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: AddProfessor_module_css_1.default.add_professor_project })] }));
}
exports.default = AddProfessor;
