import Button from '@/components/widgets/Button'
import Spinner from '@/components/widgets/Spinner'
import { stringListFrom } from '@/utils';
import React, { ChangeEventHandler, Dispatch, DragEventHandler, ReactNode, SetStateAction, useRef, useState } from 'react'

type DragEvents = {
  enter: DragEventHandler<HTMLDivElement>;
  leave: DragEventHandler<HTMLDivElement>;
  drop: DragEventHandler<HTMLDivElement>;
}

type FileAllowed = {
  label: string,
  type: string, // Common MIME types => https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
}

type Props = {
  loadingEmployees: boolean,
  multiple?: boolean,
  filesAllowed: FileAllowed[],
  setLoadingEmployees: Dispatch<SetStateAction<boolean>>
  handleFiles: (file: FileList) => void,
  children?: ReactNode
}

const DropZone = ({ multiple = false, filesAllowed, handleFiles, loadingEmployees, setLoadingEmployees, children }: Props) => {

  const $input = useRef<HTMLInputElement>(null)

  const loadFiles = async (files: FileList) => {
    setLoadingEmployees(true)
    await handleFiles(files)
    setLoadingEmployees(false)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const { files } = event.target
    if (files?.length) loadFiles(files)
  }

  const handleDrag: DragEvents = {
    enter: ({ currentTarget }) => {
      currentTarget.classList.add("draggingOver")
    },
    leave: ({ currentTarget }) => {
      currentTarget.classList.remove("draggingOver")
    },
    // When the files are drop then they're handled from outside the component
    drop: async (event) => {
      event.preventDefault()
      event.currentTarget.classList.remove("draggingOver")

      const { files } = event.dataTransfer

      if (files?.length) loadFiles(files)
    }
  }

  const allowedTypes = filesAllowed.map(item => item.type).join(",")
  const allowedFileLabels = filesAllowed.map(item => item.label)

  return (
    <>
      <div>
        <h4 className="text-lg sm:text-2xl mt-8 font-semibold">
          {children}
        </h4>
        <div
          className="DropZone grid gap-4 place-content-center justify-items-center"
          onDrop={handleDrag.drop}
          onDragEnter={handleDrag.enter}
          onDrag={handleDrag.enter}
          onDragLeave={handleDrag.leave}
          onDragOver={(event) => event.preventDefault()}
        // onDropCapture={}
        >
          {
            loadingEmployees ?
              <>
                <Spinner size="normal" />
                <span className="text-xl font-medium text-slate-600 mt-5">Procesando el archivo</span>
              </>
              :
              <>
                <img src="https://i.imgur.com/KZW9aDD.png" alt="" />
                <div className="text-center">
                  <span className="text-xl font-medium text-slate-600">Suelta el archivo aquí</span>
                  <small className="block text-slate-400">Archivos permitidos: {stringListFrom(allowedFileLabels)}</small>
                </div>
                <Button onClick={() => $input.current?.click()} color="secondary" className="!py-2">Subir Archivo</Button>
              </>
          }
          <input
            hidden
            type="file"
            ref={$input}
            accept={allowedTypes}
            multiple={multiple}
            onChange={handleChange}
          />
        </div>
      </div>

    </>
  )
}

export default DropZone