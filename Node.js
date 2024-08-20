const express = require('express');
const axios = require('axios'); 
const app = express();
const port = 3000;

app.get('/categories/:categoryname/products', async (req, res) => {
    try {
        const { categoryname } = req.params;
        let { n = 10, page = 1, sort = 'rating', order = 'asc' } = req.query;

        n = parseInt(n);
        page = parseInt(page);
        
        if (n > 10) {
            page = Math.max(page, 1); 
        } else {
            page = 1;
        }

        // Simulating API calls to e-commerce companies
        const apis = [
            `https://api.company1.com/categories/${categoryname}/products`,
            `https://api.company2.com/categories/${categoryname}/products`,
           
        ];

        
        const responses = await Promise.all(apis.map(api => axios.get(api)));
        let products = responses.flatMap(response => response.data);

        // Generate a unique id for each product
        products = products.map((product, index) => ({
            ...product,
            id: `${categoryname}-${index}`
        }));

        // Sorting
        products.sort((a, b) => {
            if (order === 'asc') return a[sort] - b[sort];
            return b[sort] - a[sort];
        });

        // Pagination
        const start = (page - 1) * n;
        const paginatedProducts = products.slice(start, start + n);

        res.json({
            page,
            totalPages: Math.ceil(products.length / n),
            products: paginatedProducts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching products.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
