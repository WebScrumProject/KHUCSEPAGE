import React, {ChangeEvent} from 'react'

interface InputProps {
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
    name: string;
    styles: any; // styles 타입은 해당 프로젝트에 맞게 설정해주세요
}

const InputProfessor: React.FC<InputProps> = ({ placeholder, onChange, name, styles }) => {
    return (
        <input className={styles.add_professor_input}
        placeholder={placeholder}
        onChange={(e) => onChange(e, name)} />
    );
};

export default InputProfessor;