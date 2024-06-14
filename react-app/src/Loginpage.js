
import { useEffect } from "react";
function LoginPage() {
useEffect(() => {
window.location.href = window.origin + "/__catalyst/auth/login";
}, []);
return null;
}
export default LoginPage;