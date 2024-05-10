const { test, expect, beforeEach, describe } = require('@playwright/test');


describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http:localhost:3003/api/testing/reset')

        await request.post('http://localhost:3003/api/users', {
            data: {
                username: "cantarina93",
                name: "Angela Cantaora",
                password: "travesera"
            }
        })

        await request.post('http://localhost:3003/api/users', {
            data: {
                username: "Pepperoni83",
                name: "Johnny Pepperoni",
                password: "chorizo"
            }
        });

        await page.goto('http://localhost:5173');
    });

    test('Login process with correct credentials', async ({ page }) => {
        // Verificar que el título del formulario esté presente
        const titleLocator = await page.waitForSelector('h2');
        expect(await titleLocator.textContent()).toBe('Log in to application');

        await page.getByTestId('username').fill('cantarina93')
        await page.getByTestId('password').fill('travesera')

        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('Angela Cantaora')).toBeVisible()
    });

    test('Login process with incorrect credentials', async ({ page }) => {
        // Verificar que el título del formulario esté presente
        const titleLocator = await page.waitForSelector('h2');
        expect(await titleLocator.textContent()).toBe('Log in to application');

        await page.getByTestId('username').fill('cantarina93')
        await page.getByTestId('password').fill('incorrect password')

        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('invalid username or password')).toBeVisible()
    });

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId('username').fill('cantarina93')
            await page.getByTestId('password').fill('travesera')
            await page.getByRole('button', { name: 'login' }).click()
            // await Blog.deleteOne({ author: "author test" });
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'New blog' }).click()
            await page.getByTestId('title').fill('title test')
            await page.getByTestId('author').fill('author test')
            await page.getByTestId('url').fill('url test')
            await page.getByRole('button', { name: 'Create new blog' }).click()
            await expect(page.getByText('title test')).toBeVisible()
        });

        // test('Blogs are sorted by likes', async ({ page }) => {
        //     // Crear varios blogs con diferentes cantidades de likes
        //     const numBlogs = 5;
        //     for (let i = 0; i < numBlogs; i++) {
        //         await page.getByRole('button', { name: 'New blog' }).click();
        //         await page.getByTestId('title').fill(`Title test ${i}`);
        //         await page.getByTestId('author').fill(`Author test ${i}`);
        //         await page.getByTestId('url').fill(`URL test ${i}`);
        //         await page.getByRole('button', { name: 'Create new blog' }).click();
        //         await page.getByRole('button', { name: 'View' }).click();
        //         for (let j = 0; j < i; j++) {
        //             await page.getByRole('button', { name: 'Like' }).click();
        //         }
        //         await page.getByRole('button', { name: 'View' }).click();
        //     }

        //     // Obtener todos los elementos que contienen la información de los likes en la página
        //     const likesElements = await page.$$eval('.likes', elements => elements.map(element => parseInt(element.textContent)));

        //     // Verificar que el array de likes esté ordenado de forma descendente
        //     expect(likesElements).toEqual(expect.arrayContaining(likesElements.sort().reverse()));
        // });

        test('Blogs are sorted according to likes', async ({ page }) => {
            // Crear algunos blogs
            await page.getByRole('button', { name: 'New blog' }).click()
            await page.getByTestId('title').fill('First Blog')
            await page.getByTestId('author').fill('Author One')
            await page.getByTestId('url').fill('http://example.com/1')
            await page.getByRole('button', { name: 'Create new blog' }).click()
            await expect(page.getByText('First Blog')).toBeVisible()

            await page.getByRole('button', { name: 'New blog' }).click()
            await page.getByTestId('title').fill('Second Blog')
            await page.getByTestId('author').fill('Author Two')
            await page.getByTestId('url').fill('http://example.com/2')
            await page.getByRole('button', { name: 'Create new blog' }).click()
            await expect(page.getByText('Second Blog')).toBeVisible()

            await page.getByRole('button', { name: 'New blog' }).click()
            await page.getByTestId('title').fill('Third Blog')
            await page.getByTestId('author').fill('Author Three')
            await page.getByTestId('url').fill('http://example.com/3')
            await page.getByRole('button', { name: 'Create new blog' }).click()
            await expect(page.getByText('Third Blog')).toBeVisible()

            // Dar likes a los blogs
            const viewButtons = await page.$$('button.viewButton')
            // await viewButtons[0].click() // Click en el primer botón "View"
            // await page.getByRole('button', { name: 'Like' }).click({ timeout: 2000 })
            // await page.goBack({ timeout: 2000 })

            await viewButtons[1].click() // Click en el segundo botón "View"
            // await page.getByRole('button', { name: 'Like' }).click()
            await page.goBack({ timeout: 2000 })

            // Obtener la lista de blogs ordenada
            const blogs = await page.$$('.blog')
            const likes = await Promise.all(blogs.map(async blog => {
                const likeElement = await blog.$('.like-count')
                return parseInt(await likeElement.innerText())
            }))

            // Verificar que los blogs estén ordenados por likes
            for (let i = 0; i < likes.length - 1; i++) {
                expect(likes[i]).toBeGreaterThanOrEqual(likes[i + 1])
            }
        })

        // test('Blogs should be ordered by likes, highest first', async ({ page }) => {
        //     // Crea tres blogs con diferentes cantidades de likes
        //     await createBlog(page, 'Blog 1', 'Author 1', 'url1.com', 5);
        //     await createBlog(page, 'Blog 2', 'Author 2', 'url2.com', 10);
        //     await createBlog(page, 'Blog 3', 'Author 3', 'url3.com', 3);

        //     // Verifica que los blogs estén ordenados correctamente
        //     const blogTitlesAndLikes = await page.$$eval('.blog', blogs => blogs.map(blog => {
        //         const title = blog.querySelector('.blog-title').textContent;
        //         const likes = parseInt(blog.querySelector('.blog-likes').textContent);
        //         return { title, likes };
        //     }));

        //     blogTitlesAndLikes.sort((a, b) => b.likes - a.likes);
        //     const expectedOrder = blogTitlesAndLikes.map(({ title }) => title);
        //     expect(expectedOrder).toEqual(['Blog 2', 'Blog 1', 'Blog 3']);
        // });

        // // Función auxiliar para crear un nuevo blog y darle likes
        // async function createBlog(page, title, author, url, likes) {
        //     await page.getByRole('button', { name: 'New blog' }).click();
        //     await page.getByTestId('title').fill(title);
        //     await page.getByTestId('author').fill(author);
        //     await page.getByTestId('url').fill(url);
        //     await page.getByRole('button', { name: 'Create new blog' }).click();

        //     await page.getByRole('button', { name: 'View' }).click();
        //     for (let i = 0; i < likes; i++) {
        //         await page.getByRole('button', { name: 'Like' }).click();
        //     }
        // }


        describe('When a new blog is created', () => {
            beforeEach(async ({ page }) => {
                await page.getByRole('button', { name: 'New blog' }).click()
                await page.getByTestId('title').fill('title test')
                await page.getByTestId('author').fill('author test')
                await page.getByTestId('url').fill('url test')
                await page.getByRole('button', { name: 'Create new blog' }).click()
                await expect(page.getByText('title test')).toBeVisible()
            })
            test('Blog can be edited, add likes', async ({ page }) => {
                await page.getByRole('button', { name: 'View' }).click()
                await expect(page.getByText('0')).toBeVisible()
                await page.getByRole('button', { name: 'Like' }).click()
                await expect(page.getByText('1')).toBeVisible()
            })
            test('Blog can be deleted by owner', async ({ page }) => {
                await page.getByRole('button', { name: 'View' }).click()
                await page.getByRole('button', { name: 'Remove' }).click()

                await page.on('dialog', dialog => dialog.accept());//esta linea no es necesaria en realidad
                await expect(page.locator('title test')).toHaveCount(0);
            })

            test('Only the creator can see the delete button', async ({ page }) => {

                // Verifica que el botón de eliminación esté visible para el creador (Angela)
                await page.getByRole('button', { name: 'View' }).click();
                await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();

                // Cierra la sesión
                await page.getByRole('button', { name: 'Log out' }).click();

                // Inicia sesión con otro usuario
                await page.getByTestId('username').fill('Pepperoni83');
                await page.getByTestId('password').fill('chorizo');
                await page.getByRole('button', { name: 'login' }).click();

                // Verifica que el botón de eliminación no esté visible para el otro usuario
                await page.getByRole('button', { name: 'View' }).click();
                await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible();
            });
        });
    });


})



