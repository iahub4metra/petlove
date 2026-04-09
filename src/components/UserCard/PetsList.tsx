import { useSelector } from 'react-redux';
import { selectAuthOperations, selectUser } from '../../redux/auth/selectors';
import PetsItem from './PetsItem';
import ErrorBanner from '../Errors/ErrorBanner';
import { useErrorBanner } from '../../hooks/useErrorBanner';

export default function PetsList() {
    const user = useSelector(selectUser);
    const removePetStatus = useSelector(selectAuthOperations).removePet;
    const removePetError = useErrorBanner(
        removePetStatus.status,
        removePetStatus.error,
    );
    const userPets = user && 'pets' in user ? user.pets : [];

    return (
        <>
            <ul className="flex flex-col gap-4 mt-[17px] max-h-[284px] h-[284px] overflow-y-scroll md:flex-row md:max-h-[150px] md:h-[150px] md:gap-[13px] md:flex-wrap xl:flex-nowrap xl:flex-col xl:max-h-[274px] xl:h-[274px] custom-scrollbar">
                {userPets.map((pet) => (
                    <li key={pet._id}>
                        <PetsItem pet={pet} />
                    </li>
                ))}
            </ul>
            <ErrorBanner {...removePetError} />
        </>
    );
}
