import AddPetForm from '../../components/AddPetForm/AddPetForm';
import PetBlock from '../../components/PetBlock/PetBlock';

export default function AddPetPage() {
    return (
        <section className="addPet-page-container">
            <div className="gap-8 xl:flex">
                <PetBlock />
                <AddPetForm />
            </div>
        </section>
    );
}
