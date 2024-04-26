const blog = require("../models/blog");

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0);
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null; // Devuelve null si la lista de blogs está vacía
    }

    // Encuentra el blog con más likes usando reduce
    const favorite = blogs.reduce((prevBlog, currentBlog) => {
        return (prevBlog.likes > currentBlog.likes) ? prevBlog : currentBlog;
    });

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    };
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null; // Devuelve null si la lista de blogs está vacía
    }

    // Crear un objeto para almacenar el recuento de blogs por autor
    const blogCounts = {};
    blogs.forEach(blog => {
        if (blog.author in blogCounts) {
            blogCounts[blog.author]++;
        } else {
            blogCounts[blog.author] = 1;
        }
    });

    // Encontrar el autor con la mayor cantidad de blogs
    let maxBlogs = 0;
    let authorWithMostBlogs = null;
    for (const author in blogCounts) {
        if (blogCounts[author] > maxBlogs) {
            maxBlogs = blogCounts[author];
            authorWithMostBlogs = author;
        }
    }


    return {
        author: authorWithMostBlogs,
        blogs: maxBlogs
    };
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null; // Devuelve null si la lista de blogs está vacía
    }

    // Crear un objeto para almacenar los likes por autor
    const likesByAuthor = {};
    blogs.forEach(blog => {
        if (blog.author in likesByAuthor) {
            likesByAuthor[blog.author] += blog.likes;
        } else {
            likesByAuthor[blog.author] = blog.likes;
        }
    });

    // Encontrar el autor con la mayor cantidad de likes
    let maxLikes = 0;
    let authorWithMostLikes = null;
    for (const author in likesByAuthor) {
        if (likesByAuthor[author] > maxLikes) {
            maxLikes = likesByAuthor[author];
            authorWithMostLikes = author;
        }
    }

    return {
        author: authorWithMostLikes,
        likes: maxLikes
    };
}

const blogsQuantity = (blogs) => {

}

module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes, blogsQuantity
}