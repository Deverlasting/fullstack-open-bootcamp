// import { render, screen } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"
// import CreateBlogForm from "./CreateBlogForm"

// test("CreateBlogForm calls handleSubmit with correct details", async () => {
//   const mockHandleSubmit = vi.fn()
//   render(<CreateBlogForm handleSubmit={mockHandleSubmit} />)
//   //   const { container } = render(<CreateBlogForm handleSubmit={mockHandleSubmit} />)
//   //   const div = container.querySelector(".blog")

//   const user = userEvent.setup()
//   //   const newBlogButton = screen.getByLabelText("New blog")
//   const newBlogButton = screen.getByRole("button", { name: "New blog" })
//   await user.click(newBlogButton)

//   // const titleInput = screen.getByRole("textbox", { name: "title" })
//   const titleInput = screen.getByPlaceholderText("title")
//   const authorInput = screen.getByPlaceholderText("author")
//   const urlInput = screen.getByPlaceholderText("url")
//   const createBlogButton = screen.getByRole("button", { name: "Create new blog" })

//   await user.type(titleInput, "Test Title")
//   await user.type(authorInput, "Test Author")
//   await user.type(urlInput, "https://example.com")

//   await user.click(createBlogButton)

//   expect(mockHandleSubmit).toHaveBeenCalledWith({
//     title: "Test Title",
//     author: "Test Author",
//     url: "https://example.com",
//   })
// })

import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CreateBlogForm from "./CreateBlogForm"

describe("CreateBlogForm", () => {
  test("calls handleSubmit with correct details", async () => {
    const mockHandleSubmit = vi.fn()
    render(<CreateBlogForm handleSubmit={mockHandleSubmit} />)

    const user = userEvent.setup()
    const newBlogButton = screen.getByRole("button", { name: "New blog" })
    await user.click(newBlogButton)

    const titleInput = screen.getByPlaceholderText("title")
    const authorInput = screen.getByPlaceholderText("author")
    const urlInput = screen.getByPlaceholderText("url")
    const createBlogButton = screen.getByRole("button", { name: "Create new blog" })

    await user.type(titleInput, "Test Title")
    await user.type(authorInput, "Test Author")
    await user.type(urlInput, "https://example.com")
    await user.click(createBlogButton)

    expect(mockHandleSubmit.mock.calls).toHaveLength(1) //se llama a la función

    expect(mockHandleSubmit.mock.calls[0][0].title).toBe("title")
    // expect(mockHandleSubmit).toHaveBeenCalledWith({
    //   title: "Test Title",
    //   author: "Test Author",
    //   url: "https://example.com",
    // })
  })
})
