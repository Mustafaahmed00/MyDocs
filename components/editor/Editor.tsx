'use client';

import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import React, { useState } from 'react';
import { $getSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { 
  FloatingComposer, 
  FloatingThreads, 
  liveblocksConfig, 
  LiveblocksPlugin, 
  useEditorStatus 
} from '@liveblocks/react-lexical';
import Loader from '../Loader';
import AIAssistant from '@/components/AIAssistant';
import FloatingToolbarPlugin from './plugins/FloatingToolbarPlugin';
import { useThreads } from '@liveblocks/react/suspense';
import Comments from '../Comments';
import { DeleteModal } from '../DeleteModal';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

// Create a separate component for text selection handling
function EditorContent({ 
  currentUserType, 
  roomId 
}: { 
  currentUserType: UserType;
  roomId: string;
}) {
  const [editor] = useLexicalComposerContext(); 
  const [selectedText, setSelectedText] = useState('');
  const status = useEditorStatus();
  const { threads } = useThreads();

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setSelectedText(selection.toString());
    } else {
      setSelectedText('');
    }
  };

  const handleSuggestion = (suggestion: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if (selection && !selection.isCollapsed()) {
        selection.insertText(suggestion);
      }
    });
  };

  return (
    <div className="editor-container size-full">
      <div className="toolbar-wrapper flex min-w-full justify-between">
        <ToolbarPlugin />
        {currentUserType === 'editor' && <DeleteModal roomId={roomId} />}
      </div>

      <div className="editor-wrapper flex flex-col items-center justify-start">
        {status === 'not-loaded' || status === 'loading' ? <Loader /> : (
          <div 
            className="editor-inner min-h-[1100px] relative mb-5 h-fit w-full max-w-[800px] shadow-md lg:mb-10"
            onMouseUp={handleTextSelection}
            onKeyUp={handleTextSelection}
          >
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="editor-input h-full" />
              }
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            
            {currentUserType === 'editor' && (
              <>
                <FloatingToolbarPlugin />
                <AIAssistant
                  selectedText={selectedText}
                  onSuggestion={handleSuggestion}
                  className="z-50"
                />
              </>
            )}
            
            <HistoryPlugin />
            <AutoFocusPlugin />
          </div>
        )}

        <LiveblocksPlugin>
          <FloatingComposer className="w-[350px]" />
          <FloatingThreads threads={threads} />
          <Comments />
        </LiveblocksPlugin>
      </div>
    </div>
  );
}

export function Editor({ roomId, currentUserType }: { roomId: string, currentUserType: UserType }) {
  const initialConfig = liveblocksConfig({
    namespace: 'Editor',
    nodes: [HeadingNode],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable: currentUserType === 'editor',
  });

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorContent 
        currentUserType={currentUserType} 
        roomId={roomId} 
      />
    </LexicalComposer>
  );
}