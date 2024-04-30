import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

test("renders content", () => {
  const blog = {
    title: "Sandwich mixto",
    author: "Angela",
    url: "trancheteando.com",
    likes: 4,
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector(".blog")
  expect(div).toHaveTextContent("Sandwich mixto")
  expect(div).toHaveTextContent("Angela")
  expect(div).not.toHaveTextContent("trancheteando.com")
  expect(div).not.toHaveTextContent(4)
})

test("Clicking view button show details", async () => {
  const blog = {
    title: "Sandwich mixto",
    author: "Angela",
    url: "trancheteando.com",
    likes: 4,
    user: {
      username: "testuser",
      name: "Test User",
    },
  }

  const { container } = render(<Blog blog={blog} user={{ username: "testuser" }} />)
  const div = container.querySelector(".blog")

  const user = userEvent.setup()
  const button = screen.getByRole("button")

  expect(div).not.toHaveTextContent("trancheteando.com")
  expect(div).not.toHaveTextContent(4)

  await user.click(button)

  expect(div).toHaveTextContent("trancheteando.com")
  expect(div).toHaveTextContent(4)
})

test("If you click twice like button it calls controller twice", async () => {
  const blog = {
    id: "123",
    title: "Sandwich mixto",
    author: "Angela",
    url: "trancheteando.com",
    likes: 4,
    user: {
      username: "testuser",
      name: "Test User",
    },
  }

  const mockHandleLike = vi.fn()
  const { container } = render(<Blog blog={blog} user={{ username: "testuser" }} handleLike={mockHandleLike} />)

  // const div = container.querySelector(".blog")

  const user = userEvent.setup()
  const viewButton = screen.getByRole("button", { name: "View" })

  await user.click(viewButton)

  const likeButton = screen.getByText("Like")
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandleLike.mock.calls).toHaveLength(2)
})
