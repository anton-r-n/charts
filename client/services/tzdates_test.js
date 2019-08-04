(function(w) {
  var T = w.T = w.T || {},
      assert = console.assert,
      tzdate = T.tzdate = {};

  tzdate.tzformat = function() {
    var d = new Date(1501956526349),
        expected,
        received;

    expected = '2017-08-05T18:08:46Z';
    received = $.tzformat(d, 'ISO', 0);
    assert(expected === received,
        'TzDate expected %s received %s', expected, received);

    expected = '2017-08-05T11:08:46+07:00';
    received = $.tzformat(d, 'ISO', 420);
    assert(expected === received,
        'TzDate expected %s received %s', expected, received);
  };

  tzdate.parse = function() {
    var received = $.parseDate('2017-12-01'),
        expected = new Date('2017-12-01T00:00:00Z');
    assert(+expected === +received,
        '$.parseDate expected %s, received %s', expected, received);
  };

  /*
    How to use a custom time in browser
    to test for client vs server time difference
    https://stackoverflow.com/questions/16448754

    Create a new empty directory for a separate Chrome user profile.
    mkdir ~/chrome-profile

    You specify the TZ environment variable. You can see the valid timezones
    for example here, in column TZ.
    https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

    US/Pacific        -08:00
    Etc/GMT+6         -06:00
    Etc/GMT-14        +14:00

    To start Chrome, use these commands:

    for Mac OS X: TZ='US/Pacific' open -na "Google Chrome" \
        --args "--user-data-dir=$HOME/chrome-profile"

    for Linux: TZ='US/Pacific' google-chrome \
        "--user-data-dir=$HOME/chrome-profile"

    For Mac OS X Firefox:
    TZ=Japan /Applications/Firefox.app/Contents/MacOS/firefox
  */
})(this);
