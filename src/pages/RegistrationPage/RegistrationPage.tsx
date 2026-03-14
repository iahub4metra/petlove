import RegistrationForm from '../../components/AuthForms/RegistrationForm';
import PetBlock from '../../components/PetBlock/PetBlock';

export default function RegisterPage() {
    return (
        <div className="flex flex-col gap-2.5 md:gap-4 xl:gap-8 adaptive-container xl:flex-row">
            <PetBlock />
            <RegistrationForm />
        </div>
    );
}
