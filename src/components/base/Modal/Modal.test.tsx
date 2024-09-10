import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

const onClose = vi.fn();

afterEach(() => {
  onClose.mockReset();
});

afterAll(() => {
  onClose.mockClear();
});

test("Modal component does not render when show is false", () => {
  render(<Modal show={false} onClose={onClose} />);
  const dialog = screen.queryByRole("dialog");

  expect(dialog).toBeNull();
  expect(dialog).not.toBeInTheDocument();
});

test("Modal component renders when show is true", () => {
  render(<Modal show={true} onClose={onClose} />);
  const dialog = screen.getByRole("dialog");

  expect(dialog).toBeInTheDocument();
});

test("Modal component calls onClose when close button is clicked", async () => {
  render(<Modal show={true} onClose={onClose} />);

  const closeButton = screen.getByRole("button", {
    name: /modal close button/i,
  });

  await waitFor(async () => {
    await userEvent.click(closeButton);
  });

  // We are controlling the modal show from outside so we can't test if it leaves DOM or not by onClose click
  expect(onClose).toHaveBeenCalledTimes(1);
});

test("Modal component applies custom class names correctly", () => {
  const customClasses = {
    wrapper: "custom-wrapper",
    overlay: "custom-overlay",
    content: "custom-content",
  };

  render(<Modal show={true} classNames={customClasses} onClose={onClose} />);

  const wrapperElement = screen.getByRole("dialog");
  expect(wrapperElement).toHaveClass("modal custom-wrapper");

  const overlay = screen.getByRole("presentation");
  expect(overlay).toHaveClass("modal__overlay custom-overlay");
});

test("Modal component renders modal body, modal header, and modal footer correctly", () => {
  render(
    <Modal show={true} onClose={onClose}>
      <Modal.Header>Modal Header</Modal.Header>
      <Modal.Body>Modal Body</Modal.Body>
      <Modal.Footer>Modal Footer</Modal.Footer>
    </Modal>,
  );

  const modalHeader = screen.getByText(/modal header/i);
  const modalBody = screen.getByText(/modal body/i);
  const modalFooter = screen.getByText(/modal footer/i);

  expect(modalHeader).toBeInTheDocument();
  expect(modalBody).toBeInTheDocument();
  expect(modalFooter).toBeInTheDocument();
});

test("Modal component cleans up correctly when unmounted", () => {
  const { unmount } = render(<Modal show={true} onClose={onClose} />);

  const modalOpened = screen.getByRole("dialog");
  expect(modalOpened).toBeInTheDocument();

  unmount();

  const modalClosed = screen.queryByRole("dialog");
  expect(modalClosed).not.toBeInTheDocument();
});
