import RegisterForm from '@/app/components/Auth/RegisterForm';
const Register = () => {


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl text-center mb-6">新規登録</h1>
                <RegisterForm/>
            </div>

            
        </div>
    )
}
export default Register;