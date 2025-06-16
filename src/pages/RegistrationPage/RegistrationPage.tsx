import RegistrationForm from '../../components/AuthForms/RegistrationForm';
import AuhtPetBlock from '../../components/AuthPetBlock/AuthPetBlock';

export default function RegisterPage() {
    return (
        <div className="flex flex-col gap-2.5 md:gap-4 xl:gap-8 adaptive-container xl:flex-row">
            <AuhtPetBlock />
            <RegistrationForm />
        </div>
    );
}
