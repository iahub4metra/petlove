import { FaStar } from 'react-icons/fa6';
import { CiHeart } from 'react-icons/ci';
import { FaRegTrashAlt } from 'react-icons/fa';
import type { Pet } from '../App/types';
import type { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    addNoticeToFavourite,
    getNoticeById,
    removeNoticeFromFavourite,
} from '../../redux/notices/operations';
import {
    manageModalAttention,
    manageModalNotice,
} from '../../redux/uiState/slice';
import { selectAuthOperations, selectUser } from '../../redux/auth/selectors';
import { Button } from '@mui/material';
import { selectNoticesStatus } from '../../redux/notices/selectors';

export interface NoticesItemProps {
    pet: Pet;
    viewed?: boolean;
    favourite?: boolean;
}

export default function NoticesItem({
    pet,
    viewed,
    favourite,
}: NoticesItemProps) {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector(selectUser);
    const noticeByIdStatus = useSelector(selectNoticesStatus).noticeById;
    const noticeOperationsStatus = useSelector(selectAuthOperations);
    const userID = user && '_id' in user ? user._id : undefined;
    const noticesFavorites =
        user && 'noticesFavorites' in user ? user.noticesFavorites : undefined;
    const isLoadingBtnState =
        (noticeOperationsStatus.addFav.status === 'loading' &&
            noticeOperationsStatus.addFav.currentId === pet._id) ||
        (noticeOperationsStatus.removeFav.status === 'loading' &&
            noticeOperationsStatus.removeFav.currentId === pet._id);

    const handleLearnMore = async () => {
        if (localStorage.getItem('token')) {
            await dispatch(getNoticeById(pet._id)).unwrap();
            dispatch(manageModalNotice(true));
        } else {
            dispatch(manageModalAttention(true));
        }
    };

    const petInfo = [
        {
            label: 'Name',
            value: pet.name.charAt(0).toUpperCase() + pet.name.slice(1),
        },
        { label: 'Birthday', value: pet.birthday?.split('-').join('.') },
        {
            label: 'Sex',
            value: pet.sex.charAt(0).toUpperCase() + pet.sex.slice(1),
        },
        {
            label: 'Species',
            value: pet.species.charAt(0).toUpperCase() + pet.species.slice(1),
        },
        {
            label: 'Category',
            value: pet.category.charAt(0).toUpperCase() + pet.category.slice(1),
        },
    ];

    return (
        <div
            className={`bg-white rounded-[16px] p-[24px] max-w-[335px] w-full md:w-[342px] md:max-w-[342px] ${
                viewed
                    ? 'xl:w-[320px] xl:max-w-[320px] xl:p-3.5'
                    : favourite
                      ? 'xl:w-[320px] xl:max-w-[320px] xl:p-3.5'
                      : 'xl:w-[363px] xl:max-w-[363px]'
            } `}
        >
            <img
                src={pet.imgURL}
                alt="Pet's image"
                className={`w-[287px] md:w-[294px] h-[178px] xl:w-[315px] rounded-[16px] mb-[24px] ${
                    viewed
                        ? 'xl:w-[292px] md:mb-3.5 md:h-[162px]'
                        : favourite
                          ? 'xl:w-[292px] md:mb-3.5 md:h-[162px]'
                          : 'xl:w-[315px]'
                }`}
            />
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[#2B2B2A] text-[16px] font-bold leading-5 max-w-[210px] overflow-ellipsis line-clamp-1">
                        {pet.title}
                    </h4>
                    <span className="flex items-center gap-1">
                        <FaStar className="fill-[#FFC531] w-[16px] h-[16px]" />
                        <p className="text-[#2B2B2A] text-[14px] font-medium leading-[18px]">
                            {pet.popularity}
                        </p>
                    </span>
                </div>
                <ul className="flex items-center gap-2 min-[375px]:gap-3.5 mb-4">
                    {petInfo.map((block, index) => (
                        <li
                            key={index}
                            className="flex flex-col gap-0.5 items-start"
                        >
                            <span className="text-[10px] leading-3.5 font-medium tracking-[-0.2px] text-[#26262680]">
                                {block.label}
                            </span>
                            <span className="text-[#262626] text-[12px] font-medium leading-3.5 tracking-[-0.24px] line-clamp-1">
                                {block.value}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="line-clamp-2 text-[#2B2B2A] text-[14px] font-medium leading-[18px] tracking-[-0.28px] mb-4 h-[36px]">
                    {pet.comment}
                </p>
                <p className="mb-3 text-[#2B2B2A] text-16px] font-bold leading-5 text-left md:text-[18px] md:leading-6">
                    {pet.price ? `$${pet.price}` : 'Free'}
                </p>
                <div
                    className={`${
                        viewed ? 'flex' : 'flex gap-2.5 items-center'
                    }`}
                >
                    <Button
                        type="button"
                        onClick={handleLearnMore}
                        loading={
                            noticeByIdStatus.status === 'loading' &&
                            noticeByIdStatus.currentId === pet._id
                        }
                        sx={{
                            bgcolor: '#F6B83D',
                            flexGrow: '1',
                            transition:
                                'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: 'medium',
                            lineHeight: '18px',
                            letterSpacing: '-0.42px',
                            cursor: 'pointer',
                            borderRadius: '30px',
                            textAlign: 'center',
                            padding: '14px',
                            textTransform: 'none',
                            ':hover': {
                                bgcolor: '#F9B020]',
                                transform: 'scale(1.01)',
                            },
                            ':active': {
                                transform: 'scale(1.01)',
                            },
                            '@media screen and (min-width: 768px)': {
                                fontSize: '16px',
                                lineHeight: '20px',
                            },
                        }}
                    >
                        Learn more
                    </Button>
                    {!viewed && (
                        <Button
                            type="button"
                            loading={isLoadingBtnState}
                            sx={{
                                bgcolor: '#FFF4DF',
                                borderRadius: '100%',
                                minWidth: '46px',
                                transition:
                                    'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer',
                                width: '46px',
                                height: '46px',
                                padding: '15px',
                                '@media screen and (min-width: 768px)': {
                                    width: '48px',
                                    height: '48px',
                                },
                                ':hover': {
                                    bgcolor: '#FBE7C1',
                                },
                            }}
                            onClick={() => {
                                if (!localStorage.getItem('token')) {
                                    dispatch(manageModalAttention(true));
                                }
                            }}
                        >
                            {!noticesFavorites?.find(
                                (noticeFav) => noticeFav._id === pet._id,
                            )
                                ? noticeOperationsStatus.addFav.status !==
                                      'loading' && (
                                      <CiHeart
                                          onClick={() =>
                                              dispatch(
                                                  addNoticeToFavourite({
                                                      notice: pet,
                                                      userID: userID,
                                                  }),
                                              )
                                          }
                                          className="fill-[#F6B83D] w-[18px] h-[18px]"
                                      />
                                  )
                                : noticeOperationsStatus.removeFav.status !==
                                      'loading' && (
                                      <FaRegTrashAlt
                                          onClick={() =>
                                              dispatch(
                                                  removeNoticeFromFavourite(
                                                      pet,
                                                  ),
                                              )
                                          }
                                          className="fill-[#F6B83D] w-[18px] h-[18px]"
                                      />
                                  )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
