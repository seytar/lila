import { h } from 'snabbdom'
import { Ctrl, Tab } from './interfaces'
import discussionView from './discussion'
import { noteView } from './note'

export default function(ctrl: Ctrl) {
  return h('div#chat', {
    class: {
      side_box: true,
      mchat: true,
      mod: ctrl.opts.permissions.timeout
    }
  }, normalView(ctrl))
}

function normalView(ctrl: Ctrl) {
  const active = ctrl.vm.tab
  const tabs: Array<Tab> = ['discussion'];
  if (ctrl.note) tabs.push('note');
  return [
    h('div', {
      class: {
        chat_tabs: true,
        ['nb_' + tabs.length]: true
      }
    }, tabs.map(t => renderTab(ctrl, t, active))),
      h('div', {
      class: {
        content: true,
        [active]: true
      }
    }, (active === 'note' && ctrl.note) ? [noteView(ctrl.note)] : discussionView(ctrl))
  ]
}

function renderTab(ctrl: Ctrl, tab: Tab, active: Tab) {
  return h('div', {
    class: {
      tab: true,
      [tab]: true,
      active: tab === active
    },
    on: { click: [ctrl.setTab, tab] }
  }, tabName(ctrl, tab));
}

function tabName(ctrl: Ctrl, tab: Tab) {
  switch (tab) {
    case 'discussion':
      return [
      h('span', ctrl.data.name),
      // h('input', {
      //   type: 'checkbox',
      //   class: 'toggle_chat',
      //   title: ctrl.trans('toggleTheChat'),
      //   onchange: m.withAttr('checked', ctrl.setEnabled),
      //   checked: ctrl.vm.enabled()
      // })
    ];
    case 'note':
      return ctrl.trans('notes');
  }
}