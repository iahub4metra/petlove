import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import PetsItem from './PetsItem';

export default function PetsList() {
    const user = useSelector(selectUser);
    const userPets = user && 'pets' in user ? user.pets : [];

    return (
        <ul className="flex flex-col gap-4 mt-[17px] max-h-[284px] h-[284px] overflow-y-scroll md:flex-row md:max-h-[150px] md:h-[150px] md:gap-[13px] md:flex-wrap xl:flex-nowrap xl:flex-col xl:max-h-[274px] xl:h-[274px] custom-scrollbar">
            {userPets.map((pet) => (
                <li key={pet._id}>
                    <PetsItem pet={pet} />
                </li>
            ))}
        </ul>
    );
}
