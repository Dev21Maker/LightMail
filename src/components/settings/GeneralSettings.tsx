import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export function GeneralSettings() {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <section className="bg-card rounded-lg p-6 border border-border">
      <h2 className="text-xl font-semibold mb-6 text-foreground">{t('settings.generalSettings')}</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-foreground">{t('settings.theme')}</h3>
              <p className="text-sm text-muted-foreground">{t('settings.themeDescription')}</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring peer-focus:ring-offset-2 peer-focus:ring-offset-background rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary">
              <span className="text-lg font-medium">A</span>
            </div>
            <div>
              <h3 className="font-medium text-foreground">{t('settings.language')}</h3>
              <p className="text-sm text-muted-foreground">{t('settings.languageDescription')}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => changeLanguage('en')}
              className={`min-w-[80px] px-3 py-2 rounded-lg transition-colors ${
                i18n.language === 'en'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage('pl')}
              className={`min-w-[80px] px-3 py-2 rounded-lg transition-colors ${
                i18n.language === 'pl'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              Polski
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary">
              <span className="text-lg font-medium">TZ</span>
            </div>
            <div>
              <h3 className="font-medium text-foreground">{t('settings.timeZone')}</h3>
              <p className="text-sm text-muted-foreground">{t('settings.timeZoneDescription')}</p>
            </div>
          </div>
          <select className="min-w-[120px] px-3 py-2 bg-muted text-foreground border border-input rounded-lg focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:outline-none">
            <option value="UTC">UTC</option>
            <option value="GMT">GMT</option>
            <option value="EST">EST</option>
          </select>
        </div>
      </div>
    </section>
  );
}