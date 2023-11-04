#! /usr/bin/env node
import inquirer from 'inquirer'
import fs from 'node:fs'
import path from 'node:path'
import gradient from 'gradient-string'
import { fileURLToPath } from 'node:url'

const asciiArt: string = `
,ggg,        gg                  
dP""Y8b       88                  
Yb, '88       88                  
 '"  88       88                  
     88aaaaaaa88                  
     88"""""""88  gg      gg    ,gggg,gg    ,gggg,gg    ,ggggg,   
     88       88  I8      8I   dP"  "Y8I   dP"  "Y8I   dP"  "Y8ggg
     88       88  I8,    ,8I  i8'    ,8I  i8'    ,8I  i8'    ,8I  
     88       Y8,,d8b,  ,d8b,,d8,   ,d8I ,d8,   ,d8I ,d8,   ,d8'  
     88       'Y88P'"Y88P"'Y8P"Y8888P"888P"Y8888P"888P"Y8888P"    
                                    ,d8I'       ,d8I'             
                                  ,dP'8I      ,dP'8I              
                                 ,8"  8I     ,8"  8I              
                                 I8   8I     I8   8I              
                                 '8, ,8I     '8, ,8I              
                                  'Y8P"       'Y8P"               
`
const rainbowArt = gradient.pastel(asciiArt)
const welcomeMessage = gradient.morning('Bienvenido! Huggo CLI v1.0.0 \n')

const languageQuestion: string = "Selecciona un lenguaje:"
export const languageOptions: { label: string; value: string }[] = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
]
const templateQuestion: string = "Selecciona un template:"
const templateChoices: { name: string; value: string }[] = [
  { name: "Express-Prisma", value: "express-prisma" },
  { name: "Express-Socket.IO", value: "express-socket-io" },
]
const moduleDir = path.dirname(fileURLToPath(import.meta.url))
const templateDirectory: string = path.join(moduleDir, '..', 'templates')

async function copyTemplateFiles (languageChoice: string, templateChoice: string) {
  const templateDir: string = `${templateDirectory}/${languageOptions.find(option => option.label === languageChoice)?.value}/${templateChoice}`
  const destinationDir: string = process.cwd()

  function copyFileOrFolder (source: string, destination: string) {
    if (fs.lstatSync(source).isDirectory()) {
      fs.mkdirSync(destination, { recursive: true })

      const items = fs.readdirSync(source)

      for (const item of items) {
        const sourceItem = path.join(source, item)
        const destItem = path.join(destination, item)

        copyFileOrFolder(sourceItem, destItem)
      }
    } else {
      fs.copyFileSync(source, destination)
    }
  }

  const existingItems: string[] = []
  try {
    const destinationItems = fs.readdirSync(destinationDir)
    for (const item of destinationItems) {
      const sourceItem = path.join(templateDir, item)
      if (fs.existsSync(sourceItem)) {
        existingItems.push(item)
      }
    }
  } catch (err) {
    console.error('Error:', err)
  }

  if (existingItems.length > 0) {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Los siguientes archivos o carpetas ya existen en el directorio actual y serán sobrescritos: \n${existingItems.join('\n')} \n¿Deseas continuar ? `,
          default: false,
        },
      ])

      if (answers.overwrite) {
        copyFileOrFolder(templateDir, destinationDir)
        console.log(`Archivos y carpetas copiados desde '${templateChoice}' al directorio actual(${destinationDir}).`)
      } else {
        console.log('Operación cancelada. No se realizaron cambios.')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  } else {
    copyFileOrFolder(templateDir, destinationDir)
    console.log(`Archivos y carpetas copiados desde '${templateChoice}' al directorio actual(${destinationDir}).`)
  }
}

async function main () {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'languageChoice',
        message: welcomeMessage + '\n' + rainbowArt + '\n' + languageQuestion,
        choices: languageOptions.map((option) => option.label),
      },
      {
        type: 'list',
        name: 'templateChoice',
        message: templateQuestion,
        choices: templateChoices,
      },
    ])

    const { languageChoice, templateChoice } = answers as { languageChoice: string, templateChoice: string }
    await copyTemplateFiles(languageChoice, templateChoice)
  } catch (error) {
    console.error('Error:', error)
  }
}

main()