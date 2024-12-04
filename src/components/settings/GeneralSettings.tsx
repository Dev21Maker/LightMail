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
    <section className="rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4">{t('settings.generalSettings')}</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{t('settings.theme')}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.themeDescription')}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </span>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{t('settings.language')}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.languageDescription')}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-2 rounded-lg ${
                i18n.language === 'en'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage('pl')}
              className={`px-3 py-2 rounded-lg ${
                i18n.language === 'pl'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Polski
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{t('settings.timeZone')}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('settings.timeZoneDescription')}</p>
          </div>
          <select className="px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <option value="UTC">UTC</option>
            <option value="GMT">GMT</option>
            <option value="EST">EST</option>
          </select>
        </div>
      </div>
    </section>
  );
}