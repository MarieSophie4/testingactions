#!/bin/bash

echo "Running everything for updating the wiki"

echo 'The given filepath is: ' $1
now=$(date +"%m_%d_%Y_%H_%M")

echo $now 

mkdir "${1}resources/${now}/"
#  ESLint results generation
echo 'Running ESLint'
ng lint --fix > "${1}resources/${now}/eslint.txt"

# echo 'Running style lint'
echo 'Running stylelint'
npm run scss-lint > "${1}resources/${now}/stylelint.txt"

#  Compodoc generation
echo 'Running compodoc'
npx compodoc -p tsconfig.doc.json -d "${1}resources/${now}/docs"


# Change the readme ESLINT

input="${1}/eslint.md"
substr="warnings"

while IFS= read -r line
do
  
  textFile+=( "$line \n" )
  echo $line
  if [[ "$line" == *"$substr"* ]]; then
    textFile+=( "\n - [${now}](./resources/${now}/eslint.txt) \n" )
  fi
done < "$input"

echo  -e ${textFile[@]} > "${1}/eslint.md"


# Change the readme STYLELINT

input="${1}/stylelint.md"
substr="warnings"
unset textFile
echo "LEEG:" $textFile
while IFS= read -r line
do
  textFile+=( "$line \n" )
  echo $line
  if [[ "$line" == *"$substr"* ]]; then
    textFile+=( "\n - [${now}](./resources/${now}/stylelint.txt) \n" )
  fi
done < "$input"

echo  -e ${textFile[@]} > "${1}/stylelint.md"

# Change the readme STYLELINT

input="${1}/compodoc.md"
substr="Compodoc"
unset textFile
echo "LEEG:" $textFile
while IFS= read -r line
do
  textFile+=( "$line \n" )
  echo $line
  if [[ "$line" == *"$substr"* ]]; then
    textFile+=( "\n - [${now}](./resources/${now}/docs) \n" )
  fi
done < "$input"

echo  -e ${textFile[@]} > "${1}/compodoc.md"