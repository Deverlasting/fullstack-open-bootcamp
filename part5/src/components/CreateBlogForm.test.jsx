// import React from "react"
// import { fireEvent, render, screen } from "@testing-library/react"
// import CreateBlogForm from "./CreateBlogForm"
// import userEvent from "@testing-library/user-event"
// import { test, vi } from "vitest"

// describe("CreateBlogForm", () => {
//   test("calls handleSubmit with correct details", async () => {
//     const mockHandleSubmit = vi.fn()
//     const mockHandleTitleChange = vi.fn()
//     render(<CreateBlogForm onSubmit={mockHandleSubmit} handleTitleChange={mockHandleTitleChange} />)
//     const newBlogButton = screen.getByRole("button", { name: "New blog" })
//     await userEvent.click(newBlogButton)
//     const titleInput = screen.getByPlaceholderText("title")
//     const authorInput = screen.getByPlaceholderText("author")
//     const urlInput = screen.getByPlaceholderText("url")
//     // se escriben los valores en lo inputs
//     await userEvent.type(titleInput, "Test Title")
//     await userEvent.type(authorInput, "Test Author")
//     await userEvent.type(urlInput, "web")
//     const createBlogButton = screen.getByRole("button", { name: "Create new blog" })
//     await userEvent.click(createBlogButton) //se envía el formulario

//     console.log("log", mockHandleSubmit.mock.calls)
//     const titleValue = titleInput.value
//     const authorValue = authorInput.value
//     const urlValue = urlInput.value
//     console.log("Title value:", titleValue)
//     console.log("Author value:", authorValue)
//     console.log("Url value:", urlValue)
//     expect(mockHandleSubmit).toHaveBeenCalledTimes(1) //se llama a la función

//     expect(mockHandleTitleChange).toHaveBeenCalledWith("Test Title")

//     // expect(mockHandleSubmit.mock.calls[0][0].content).toBe("Test Title")
//     // expect(mockHandleSubmit).toHaveBeenCalledWith({
//     //   title: "Test Title",
//     //   author: "Test Author",
//     //   url: "web",
//     // })
//   })
// })
