import express from "express";

// Testing API
export const test = (req, res) => {
    res.json({
        message: 'API route working!',
    })
};