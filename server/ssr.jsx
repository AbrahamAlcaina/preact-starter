import { h } from 'preact';
import render from 'preact-render-to-string';
import container from './container';

module.exports = function (initData) {
  const html = render(container(initData));
  return {
    html,
    state: initData,
  };
};