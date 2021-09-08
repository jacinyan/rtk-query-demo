import { useDispatch } from "react-redux";
import { useCreateReqTokenQuery } from "src/services/apiSlice";

const Auth = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const { data, isLoading: isCreateReqTokenLoading } = useCreateReqTokenQuery();
  console.log(data ? data : null);

  const handleClick = async () => {
    if (window.confirm()) {
    }
  };

  return (
    <>
      <h1>Welcome to TMDB React Client</h1>
      <button onClick={handleClick}>Starting Authentication</button>
    </>
  );
};

export default Auth;
