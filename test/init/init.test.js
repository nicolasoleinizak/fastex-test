const { execSync } = require('child_process')
const fs = require('fs')
const { expect, test } = require('@jest/globals') 
const clearProject = require('../utils/clearProject')

describe('Initialization', () => {
    
    beforeAll(() => {
        clearProject()
        execSync("fastex init")
    })

    test("index.js exists", () => {
        const indexExists = fs.existsSync('./index.js')
        expect(indexExists).toBe(true)
    })

    test("app.js exists", () => {
        const indexExists = fs.existsSync('./src/app.js')
        expect(indexExists).toBe(true)
    })

    test("Routes folder exists", () => {
        const routesFolderExists = fs.existsSync('./src/routes')
        expect(routesFolderExists).toBe(true)
    })

    test("Controllers folder exists", () => {
        const controllerFolderExists = fs.existsSync('./src/controllers')
        expect(controllerFolderExists).toBe(true)
    })

    test("Main router exists", () => {
        const routerExists = fs.existsSync('./src/routes/index.js')
        expect(routerExists).toBe(true)
    })

    test("Routers file exists", () => {
        const routersExists = fs.existsSync('./src/routes/routers.js')
        expect(routersExists).toBe(true)
    })
})

describe('Initialization imports/exports with CommonJS', () => {

    beforeAll(() => {
        clearProject()
        execSync("fastex init --es_module=false")
    })

    test('index.js must require "app"', () => {
        const appImportRegex = /const app = require\('.\/src\/app'\)/
        const indexFile = fs.readFileSync('./index.js', 'utf8')
        expect(indexFile).toMatch(appImportRegex)
    })

    test('index.js must export "app" by default', () => {
        const exportRegex = /module.exports = app/
        const indexFile = fs.readFileSync('./index.js', 'utf8')
        expect(indexFile).toMatch(exportRegex)
    })

    test('app.js must require "express"', () => {
        const expressImportRegex = /const express = require\('express'\)/
        const appFile = fs.readFileSync('./src/app.js', 'utf8')
        expect(appFile).toMatch(expressImportRegex)
    })
    
    test('app.js must require main router', () => {
        const routerImportRegex = /const router = require\('.\/routes\/index'\)/
        const appFile = fs.readFileSync('./src/app.js', 'utf8')
        expect(appFile).toMatch(routerImportRegex)
    })
    
    test('app.js must be exported by default', () => {
        const exportRegex = /module.exports = app/
        const appFile = fs.readFileSync('./src/app.js', 'utf8')
        expect(appFile).toMatch(exportRegex)
    })
})

describe('Initialization imports/exports with ESM', () => {
    beforeAll(() => {
        clearProject()
        execSync("fastex init --es_module=true")
    })

    test('index.js must import "app"', () => {
        const appImportRegex = /import app from '\.\/src\/app\.js'/
        const indexFile = fs.readFileSync('./index.js', 'utf8')
        expect(indexFile).toMatch(appImportRegex)
    })

    test('index.js must export "app" by default', () => {
        const exportRegex = /export default app/
        const indexFile = fs.readFileSync('./index.js', 'utf8')
        expect(indexFile).toMatch(exportRegex)
    })

    test('app.js must import "express"', () => {
        const expressImportRegex = /import express from 'express'/
        const appFile = fs.readFileSync('./src/app.js', 'utf8')
        expect(appFile).toMatch(expressImportRegex)
    })
    
    test('app.js must import main router', () => {
        const routerImportRegex = /import router from '\.\/routes\/index\.js'/
        const appFile = fs.readFileSync('./src/app.js', 'utf8')
        expect(appFile).toMatch(routerImportRegex)
    })
    
    test('app.js must be exported by default', () => {
        const exportRegex = /export default app/
        const appFile = fs.readFileSync('./src/app.js', 'utf8')
        expect(appFile).toMatch(exportRegex)
    })
})