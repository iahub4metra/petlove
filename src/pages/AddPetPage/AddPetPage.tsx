import AddPetForm from '../../components/AddPetForm/AddPetForm';
import PetBlock from '../../components/PetBlock/PetBlock';

export default function AddPetPage() {
    return (
        <section>
            <div className="adaptive-container">
                <PetBlock />
                <AddPetForm />
            </div>
        </section>
    );
}
