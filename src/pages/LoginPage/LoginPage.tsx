import LoginForm from '../../components/AuthForms/LoginFrom';
import PetBlock from '../../components/PetBlock/PetBlock';

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-2.5 md:gap-4 xl:gap-8 adaptive-container xl:flex-row">
            <PetBlock />
            <LoginForm />
        </div>
    );
}
