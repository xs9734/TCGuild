document.addEventListener('DOMContentLoaded', function() {
    var initialTimeZone = 'UTC';
    var timeZoneSelectorEl = document.getElementById('time-zone-selector');
    var loadingEl = document.getElementById('loading');
    var initialLocaleCode = 'en';
    var localeSelectorEl = document.getElementById('locale-selector');
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      timeZone: initialTimeZone,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      locale: initialLocaleCode,      
      navLinks: true, // can click day/week names to navigate views
      editable: false,
      selectable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: 'js/res/events.json',
  
      loading: function(bool) {
        if (bool) {
          loadingEl.style.display = 'inline'; // show
        } else {
          loadingEl.style.display = 'none'; // hide
        }
      },
  
      eventTimeFormat: { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }
    });
  
    calendar.render();

/*Locale Selection*/
    // build the locale selector's options
    calendar.getAvailableLocaleCodes().forEach(function(localeCode) {
        var optionEl = document.createElement('option');
        optionEl.value = localeCode;
        optionEl.selected = localeCode == initialLocaleCode;
        optionEl.innerText = localeCode;
        localeSelectorEl.appendChild(optionEl);
      });
    
      // when the selected option changes, dynamically change the calendar option
      localeSelectorEl.addEventListener('change', function() {
        if (this.value) {
          calendar.setOption('locale', this.value);
        }
      });
/*Timezone Selection*/
    // load the list of available timezones, build the <select> options
    FullCalendar.requestJson('GET', 'js/res/timezones.json', {}, function(timeZones) {
      timeZones.forEach(function(timeZone) {
        var optionEl;
  
        if (timeZone !== 'UTC') { // UTC is already in the list
          optionEl = document.createElement('option');
          optionEl.value = timeZone;
          optionEl.innerText = timeZone;
          timeZoneSelectorEl.appendChild(optionEl);
        }
      });
    }, function() {
      // failure
    });
  
    // when the timezone selector changes, dynamically change the calendar option
    timeZoneSelectorEl.addEventListener('change', function() {
      calendar.setOption('timeZone', this.value);
    });
  
  });