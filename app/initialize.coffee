Whiteboard     = require './whiteboard'
HistoryManager = require './history-manager'
Preview        = require './preview'

$ =>
  whiteboard = new Whiteboard('.whiteboard-container')

  preview = new Preview '.preview'
  hist = new HistoryManager

  whiteboard.on 'changed', (svg) =>
    hist.pushHistory svg
    preview.update hist.current()

  whiteboard.on 'undo', (svg) =>
    hist.undo()
    next = hist.current()

    preview.update next
    whiteboard.setSVG next

  whiteboard.on 'redo', (svg) =>
    hist.redo()
    next = hist.current()

    preview.update next
    whiteboard.setSVG next
