"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const react_1 = require("react");
const AddProfessor_module_css_1 = __importDefault(require("../styles/AddProfessor.module.css"));
const axios_1 = __importDefault(require("axios"));
// import { ObjectId } from 'mongodb';
function UndergraduateStudentDetail() {
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
        recDate: '',
        profHistory: []
    });
    // const fetchUndergraduateDetail= async () => {
    //   try {
    //     const res = await axios.get(`/undergraduate_student/${professorData._id}`);
    //     console.log(res.data._id)
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
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
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', width: '100%' }, children: [(0, jsx_runtime_1.jsxs)("div", { className: AddProfessor_module_css_1.default.add_professor_container, children: [(0, jsx_runtime_1.jsxs)("div", { className: AddProfessor_module_css_1.default.add_professor_profile, children: [(0, jsx_runtime_1.jsx)("div", { className: AddProfessor_module_css_1.default.add_professor_profile_top, children: (0, jsx_runtime_1.jsx)("div", { className: AddProfessor_module_css_1.default.add_professor_picture, children: previewImg && ((0, jsx_runtime_1.jsx)("img", { className: AddProfessor_module_css_1.default.image_preview, src: previewImg })) }) }), (0, jsx_runtime_1.jsx)("div", { className: AddProfessor_module_css_1.default.research_container, children: (0, jsx_runtime_1.jsxs)("div", { className: AddProfessor_module_css_1.default.research_box, children: [(0, jsx_runtime_1.jsxs)("div", { className: AddProfessor_module_css_1.default.research_profile, children: [(0, jsx_runtime_1.jsx)("div", { className: AddProfessor_module_css_1.default.research_picture }), (0, jsx_runtime_1.jsxs)("p", { children: [professorData.profName, " \uAD50\uC218\uB2D8"] }), (0, jsx_runtime_1.jsx)("p", { children: professorData.profPhone })] }), (0, jsx_runtime_1.jsxs)("div", { className: AddProfessor_module_css_1.default.research_content, children: [(0, jsx_runtime_1.jsxs)("p", { children: ["\uBAA8\uC9D1 \uC778\uC6D0 : ", professorData.recNumber, "\uBA85"] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\uAE30\uAC04 : ", professorData.recDate] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\uC5F0\uAD6C \uBD84\uC57C : ", professorData.profMajor] }), (0, jsx_runtime_1.jsx)("p", { children: professorData.profLink })] })] }) })] }), (0, jsx_runtime_1.jsx)("div", { className: AddProfessor_module_css_1.default.add_professor_history, children: (0, jsx_runtime_1.jsx)("div", { className: AddProfessor_module_css_1.default.history_content }) })] }), (0, jsx_runtime_1.jsx)("div", { className: AddProfessor_module_css_1.default.add_professor_project })] }));
}
exports.default = UndergraduateStudentDetail;
