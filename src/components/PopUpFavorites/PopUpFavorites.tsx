import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowPopup } from '../../redux/auth/selectors';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import type { AppDispatch } from '../../redux/store';
import { hidePopup } from '../../redux/auth/slice';

export default function PopUpFavorites() {
    const showPopup = useSelector(selectShowPopup);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Modal
            open={showPopup}
            onClose={() => dispatch(hidePopup(false))}
            sx={{
                '& .MuiModal-backdrop': {
                    bgcolor: '#2626264D',
                },
            }}
        >
            <div className="relative bg-white rounded-[30px] px-[25px] py-[40px] md:px-14 md:py-[60px] max-w-[335px] md:max-w-[410px] top-2/4 left-3/6 translate-[-50%]">
                <button
                    type="button"
                    onClick={() => dispatch(hidePopup(false))}
                    className="absolute top-[20px] right-[20px] cursor-pointer hover:scale-[1.1] hover:rotate-180 transition-transform duration-300 active:scale-[1.1] active:rotate-180"
                >
                    <IoClose className="w-[24px] h-[24px]" />
                </button>
                <div className="rounded-full bg-[#FFF4DF] w-[80px] h-[80xp] p-[18px] mx-auto mb-[20px]">
                    <p className="text-[44px] leading-[44px]">🐈</p>
                </div>
                <div className="flex flex-col gap-[20px] items-center mb-6">
                    <h3 className="text-[20px] leading-5 tracking-[-0.36px] font-bold text-[#F6B83D] md:text-[24px] md:leading-7">
                        Congrats
                    </h3>
                    <p className="text-[14px] leading-[18px] tracking-[-0.24px] text-[#2B2B2A] text-center">
                        The first fluff in the favorites! May your friendship be
                        the happiest and filled with fun.
                    </p>
                </div>
                <button
                    onClick={() => {
                        navigate('/profile');
                        dispatch(hidePopup(false));
                    }}
                    className="w-full rounded-[30px] text-[14px] md:text-[16px] block text-center leading-[18px] md:leading-5 tracking-[-0.36px] text-white bg-[#F6B83D] p-3 md:p-[14px] hover:bg-[#F9B020] transition-colors"
                >
                    Go to profile
                </button>
            </div>
        </Modal>
    );
}
