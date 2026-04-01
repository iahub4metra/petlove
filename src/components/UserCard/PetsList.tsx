import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import PetsItem from './PetsItem';

export default function PetsList() {
    const user = useSelector(selectUser);
    const userPets = user && 'pets' in user ? user.pets : [];

    return (
        <ul className="flex flex-col gap-4 mt-[17px] max-h-[284px] h-[284px] overflow-y-scroll">
            {userPets.map((pet) => (
                <li key={pet._id}>
                    <PetsItem pet={pet} />
                </li>
            ))}
        </ul>
    );
}
