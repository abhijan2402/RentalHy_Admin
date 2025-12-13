import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="To-Let India Services Admin Dashboard"
        description="Manage your To-Let India services efficiently — track properties, clients, and operations all in one place."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
