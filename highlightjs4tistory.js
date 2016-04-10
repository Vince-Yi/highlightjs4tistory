/**
 * highlightjs4tistory - highlightjs for Tistory
 * - https://github.com/Vince-Yi/highlightjs4tistory
 *
 * Copyright (c) 2016 Vince Yi (vickisori@gmail.com).
 * Released under the MIT license
 * - http://opensource.org/licenses/mit-license.php
 *
 * Based on:
 * SyntaxHighlighter - http://alexgorbatchev.com/SyntaxHighlighter/
 * Hay Krane's jsDynaLoad() - http://github.com/hay/jsdynaload
 * tsyntax - http://tsyntax.googlecode.com
 * ddoong2's blog - http://ddoong2.com/601
 * sh4tistory - http://sh4tistory.googlecode.com
 */

$(function() {

	$('blockquote').each(function() {

		var _starter = '###';
		var $blockquote = $(this);

		// 공백과 의미없는 줄바꿈을 제외한 첫 문자가 '###'일 경우
		if ($.trim($blockquote.text().replace(/\n/gi, '')).substring(0, 3) == _starter) {

			// 복사 붙여넣기 했을 때 탭 처리
			$blockquote.find('span[class*=Apple-tab-span]').replaceWith(function() {
				return $(this).text();
			});

			// 편집창에서 직접 수정했을 때 탭 처리
			$blockquote.find('p[style*=margin-left]').each(function() {
				var $elem = $(this);
				var _style = $elem.attr('style');
				var _result = /\s*?margin-left:\s(\w+?)em;\s*?/gi.exec(_style);
				if (_result != null) {
					_result = _result[1];
				}
				var _spaceCount = parseInt(_result) * 2;
				var _spaceString = '';
				for (var i = 0; i < _spaceCount; i++) {
					_spaceString += '&nbsp;';
				}
				$elem.removeAttr('style');
				$elem.html(_spaceString + $elem.html());
			});

			var _temp = $blockquote.html();

			// p, br 태그 처리
			_temp = _temp.replace(/\n/gi, '');
			_temp = _temp.replace(/<p><\/p>/gi, '');
			_temp = _temp.replace(/<p><br\s*\/?><\/p>/gi, '\n'); // 줄바꿈
			_temp = _temp.replace(/<P>(.*?)<\/P>/gi, '$1\n'); // 한줄끝
			_temp = _temp.replace(/<br\s*\/?>/gi, '\n'); // 줄바꿈

			// 문자열 라인단위 분리
			var _tempLines = _temp.split('\n');

			var _brushName = $.trim(_tempLines.shift().replace(_starter, 'brush: '));
			
			_temp = $.trim(_tempLines.join('\n'));
			_temp = '<pre><code class="' + _brushName + '">' + _temp + '</code></pre>';
			
			$blockquote.replaceWith(_temp);
		}
	});
});