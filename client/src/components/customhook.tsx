import { useSelector } from 'react-redux';
import { RootState } from './store';

function useSomeState() {
    return useSelector((state: RootState) => state.p_list);
    
}

export default useSomeState;
