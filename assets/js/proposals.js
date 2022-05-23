const GITHUB_API_URL = 'https://api.github.com/repos/cpp-ru/ideas';
const MARKDOWN_CONVERTER = new showdown.Converter();

function proposalsDraw(query) {
  const proposals = $('#proposalsContent');
  proposals.addClass('proposals-viewer__content_loading');
  $.get(GITHUB_API_URL + '/issues?per_page=199' + query, function(data) {
    proposals.empty();

    let content = '';
    for (const x of data) {
      let preview = x.body.split('\n').slice(0, 10).join('\n')
      const code_escapes = (preview.match(/```/g) || []).length
      if (code_escapes % 2 === 1) {
        preview += '\n```'
      }

      proposals.append(
        '<div class="proposals-viewer__idea">'
        + '<h3 class="proposals-viewer__idea-title"><a href="' + x.html_url + '">' + x.title + '</a></h3>'
        + '<p class="proposals-viewer__idea-lead">' + MARKDOWN_CONVERTER.makeHtml(preview) + '</p>'
        + '</div>'
      );

      /*
      const likes_id = 'likes_' + x.number;
      const dislikes_id = 'dislikes_' + x.number;
      proposals.append('<!--p class="text-muted">Комментариев: ' + x.comments + '<span id="' + likes_id + '"></span><span id="' + dislikes_id + '"></span></p>')
      $.get(GITHUB_API_URL + '/issues/' + x.number + '/reactions?content=+1', function(data_likes) {
          $(likes_id).text(data_likes);
      });
      $.get(GITHUB_API_URL + '/issues/' + x.number + '/reactions?content=-1', function(data_dislikes) {
          $(dislikes_id).text(data_dislikes);
      });
      */

      // Syntax highlighting for dynamic content. Static content highlighting is managed by Jekyll Rogue plugin
      // ( https://docs.github.com/en/enterprise-cloud@latest/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#syntax-highlighting )
      hljs.highlightAll();

      proposals.removeClass('proposals-viewer__content_loading');
    }
  });
}

function proposalsFilterToggle() {
  const $radio = $('input[name=stateRadios]:checked');
  const $parent = $radio.closest('.proposals-viewer__filter-item');
  $('.proposals-viewer__filter-item').removeClass('proposals-viewer__filter-item_active');
  $parent.addClass('proposals-viewer__filter-item_active');
  $('#stateCheckbox').prop('checked', false);
}

function proposalsSetActiveName(label) {
  $('.proposals-viewer__filter-active-button').text(label);
}

function proposalsFilter() {
  const $radio = $('input[name=stateRadios]:checked');
  const label = $radio.find('+ .proposals-viewer__filter-button').text();
  proposalsSetActiveName(label);
  proposalsFilterToggle();
  const query = $radio.val();
  proposalsDraw(query);
}

function initProposalsNav() {
  proposalsFilter();
}

$(function() {
  initProposalsNav();
});
