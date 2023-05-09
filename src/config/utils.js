import SnackbarAlert from "../components/common/SnackBarAlert";
import { render } from "@testing-library/react";
export function showSnackBarAlert(duration, severty, message) {
  render(
    <SnackbarAlert duration={duration} severty={severty} message={message} />
  );
}
