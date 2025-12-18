import { FiEdit2 } from 'react-icons/fi';
import type { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { manageModalEditUser } from '../../redux/uiState/slice';

export default function EditUserBtn() {
    const dispatch: AppDispatch = useDispatch();
    return (
        <button
            onClick={() => dispatch(manageModalEditUser(true))}
            className="bg-[#FFF4DF] rounded-full absolute top-[18px] right-[20px] md:top-10 md:right-10 w-[38px] h-[38px] flex justify-center items-center hover:bg-[#FBE7C1] transition-colors cursor-pointer"
        >
            <FiEdit2 className="stroke-[#F6B83D] w-[15px] h-[15px] " />
        </button>
    );
}
