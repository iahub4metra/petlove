import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogoutModal } from '../../redux/uiState/selectors';
import type { AppDispatch } from '../../redux/store';
import { IoClose } from 'react-icons/io5';
import { manageLogoutModal } from '../../redux/uiState/slice';
import { signOut } from '../../redux/auth/operations';

export default function ModalApproveAction() {
    const dispatch: AppDispatch = useDispatch();
    const isOpen = useSelector(selectLogoutModal);
    const token = localStorage.getItem('token');

    return (
        <>
            <Modal
                open={isOpen}
                sx={{
                    '& .MuiModal-backdrop': {
                        bgcolor: '#2626264D',
                    },
                }}
            >
                <div className="relative bg-white rounded-[30px] px-[28px] py-[40px] max-w-[335px] md:max-w-[448px] top-2/4 left-3/6 translate-[-50%]">
                    <button
                        type="button"
                        onClick={() => dispatch(manageLogoutModal(false))}
                        className="absolute top-[20px] right-[20px] cursor-pointer hover:scale-[1.1] hover:rotate-180 transition-transform duration-300 active:scale-[1.1] active:rotate-180"
                    >
                        <IoClose className="w-[24px] h-[24px]" />
                    </button>
                    <div className="rounded-full bg-[#FFF4DF] w-[80px] h-[80xp] p-[18px] mx-auto mb-[20px]">
                        <p className="text-[44px] leading-[44px]">🐈</p>
                    </div>
                    <div className="flex flex-col gap-[28px] items-center">
                        <p className="text-[#262626] text-[20px] font-bold leading-5 tracking-[-0.6px] md:text-[24px] md:leading-7 md:tracking-[-0.72px]">
                            Already leaving?
                        </p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => dispatch(signOut(token))}
                                className="cursor-pointer hover:scale-[1.05] active:scale-[1.05] hover:bg-[#F9B020] active:bg-[#F9B020] py-[12px] md:py-[14px] md:text-[16px] md:leading-5 md:tracking-[-0.48px] text-center bg-[#F6B83D] rounded-[30px] px-[57px] text-white text-[14px] font-bold leading-[18px] tracking-[-0.42px] transition-all duration-500"
                            >
                                Yes
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    dispatch(manageLogoutModal(false))
                                }
                                className="cursor-pointer hover:scale-[1.05] active:scale-[1.05] transition-all duration-500 bg-[#2626260D] rounded-[30px] text-[14px] font-bold leading-[18px] tracking-[-0.42px] text-[#262626] py-[12px] px-[44px] md:py-[14px] md:text-[16px] md:leading-5 md:tracking-[-0.48px]"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
