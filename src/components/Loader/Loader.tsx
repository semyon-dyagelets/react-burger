import { ColorRing } from "react-loader-spinner";

export const Loader = () => {
    return (
      <ColorRing
        visible={true}
        height="24"
        width="24"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#F2F2F3", "#F2F2F3", "#F2F2F3", "#F2F2F3", "#F2F2F3"]}
      />
    );
  };