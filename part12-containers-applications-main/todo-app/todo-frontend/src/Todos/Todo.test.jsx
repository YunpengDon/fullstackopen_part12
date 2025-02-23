import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "./Todo";
import { expect, test } from "vitest";

describe("<Todo /> redered right", () => {
  let container;
  const todos = [
    {
      id: "testid001",
      text: "this is test of undo task",
      done: false,
    },
    {
      id: "testid002",
      text: "this is test of done task",
      done: true,
    },
  ];
  const mockOnClickDelete = vi.fn();
  const mockOnClickComplete = vi.fn();
  beforeEach(() => {
    container = render(
      <>
        {todos.map((todo) => (
          <Todo
            todo={todo}
            key={todo.id}
            onClickComplete={mockOnClickComplete}
            onClickDelete={mockOnClickDelete}
          />
        ))}
      </>
    );
  });

  test('the undo todo\'s title is rendered', () => {
    const element = screen.getByText('this is test of undo task', { exact: false })
    expect(element).toBeDefined()
  })

  test('the done todo\'s title is rendered', () => {
    const element = screen.getByText('this is test of done task', { exact: false })
    expect(element).toBeDefined()
  })

  test('the undo task has set-as-done button', () => {
    const parentElement = screen.getByText('this is test of undo task', { exact: false }).parentElement
    const doneButton = within(parentElement).getByText('Set as done')
    const deleteButton = within(parentElement).getByText('Delete')
    expect(doneButton).toBeDefined()
    expect(deleteButton).toBeDefined()
  })

  test('the undo task dose not have set-as-done button', () => {
    const parentElement = screen.getByText('this is test of done task', { exact: false }).parentElement
    const doneButton = within(parentElement).queryByText('Set as done')
    const deleteButton = within(parentElement).getByText('Delete')
    expect(doneButton).not.toBeInTheDocument()
    expect(deleteButton).toBeDefined()
  })
});
