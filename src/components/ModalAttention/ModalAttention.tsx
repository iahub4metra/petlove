import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalAttention } from '../../redux/uiState/selectors';
import type { AppDispatch } from '../../redux/store';
import { manageModalAttention } from '../../redux/uiState/slice';
import { IoClose } from 'react-icons/io5';
import AuthNav from '../AuthNav/AuthNav';

export default function ModalAttention() {
    const isOpen = useSelector(selectModalAttention);
    const dispatch: AppDispatch = useDispatch();
    return (
        <Modal
            open={isOpen}
            onClose={() => dispatch(manageModalAttention(false))}
            sx={{
                '& .MuiModal-backdrop': {
                    bgcolor: '#2626264D',
                },
            }}
        >
            <div className="relative bg-white rounded-[30px] px-[28px] py-[40px] max-w-[335px] md:max-w-[448px] top-2/4 left-3/6 translate-[-50%]">
                <button
                    type="button"
                    onClick={() => dispatch(manageModalAttention(false))}
                    className="absolute top-[20px] right-[20px] cursor-pointer hover:scale-[1.1] hover:rotate-180 transition-transform duration-300 active:scale-[1.1] active:rotate-180"
                >
                    <IoClose className="w-[24px] h-[24px]" />
                </button>
                <div className="rounded-full bg-[#FFF4DF] w-[80px] h-[80xp] p-[18px] mx-auto mb-[20px]">
                    <p className="text-[44px] leading-[44px]">🐶</p>
                </div>
                <h4 className="text-[#F6B83D] text-[20px] leading-5 font-bold tracking-[-0.6px] text-center mb-[20px]">
                    Attention
                </h4>
                <p className="text-[#2B2B2A] text-[14px] font-medium leading-[18px] tracking-[-0.28px] text-center mb-[24px]">
                    We would like to remind you that certain functionality is
                    available only to authorized users.If you have an account,
                    please log in with your credentials. If you do not already
                    have an account, you must register to access these features.
                </p>
                <div className="flex justify-center">
                    <AuthNav isModal />
                </div>
            </div>
        </Modal>
    );
}
